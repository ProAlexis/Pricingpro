# 🔧 Diagnostic du Workflow de Scraping

## ❌ Problème Actuel

Le workflow GitHub Actions "Scrape Market Rates" échoue systématiquement.

## 🔍 Causes Probables

### 1. **Secrets GitHub Manquants** (PRIORITAIRE)

Vérifiez que les secrets suivants sont configurés dans GitHub :

**Aller à :** `Settings` → `Secrets and variables` → `Actions` → `Repository secrets`

**Secrets requis :**
- `SUPABASE_URL` : URL de votre projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : **Clé admin (service_role)** - Nécessaire pour bypass RLS et faire des INSERT/DELETE en masse

### 2. **Permissions Supabase**

Le scraper doit pouvoir :
- `DELETE` sur la table `market_rates` (ligne 26-29 de master-scraper.js)
- `INSERT` massif sur `market_rates` (batches de 100)
- `INSERT` massif sur `market_rates_history`

**Vérifier les Row Level Security (RLS) policies :**
```sql
-- Dans Supabase SQL Editor
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename IN ('market_rates', 'market_rates_history');
```

**Si RLS est activé, ajouter :**
```sql
-- Permettre INSERT/DELETE avec la clé de service
CREATE POLICY "Allow service role full access on market_rates"
ON market_rates
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow service role full access on market_rates_history"
ON market_rates_history
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

### 3. **Limites de Rate Nominatim**

Le scraper utilise l'API Nominatim (OpenStreetMap) pour géocoder les villes.

**Limite :** 1 requête/seconde (respectée dans le code ligne 194)

Si trop de villes inconnues → timeout possible.

### 4. **Timeout GitHub Actions**

Le scraper peut prendre 2-5 minutes. Si > 6 minutes → timeout.

**Optimisation actuelle :**
- Scraping parallèle (Promise.all ligne 41-48)
- Insertion par batch de 100 (ligne 86-98)

## ✅ Tests de Diagnostic

### Test Local (Recommandé)

```bash
# 1. Créer un fichier .env local avec vos clés
cat > .env << EOF
SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
EOF

# 2. Installer les dépendances
npm install

# 3. Tester le scraper
node run-scraper.js

# ✅ Si succès : vous devriez voir ~3500+ tarifs insérés
# ❌ Si échec : noter le message d'erreur exact
```

### Test GitHub Actions (Manuel)

1. Aller dans l'onglet **Actions** du repo
2. Sélectionner "Scrape Market Rates"
3. Cliquer **Run workflow** → **Run workflow**
4. Attendre 2-5 minutes
5. Si échec → Télécharger les logs (artifact "scraper-logs")

## 🛠️ Corrections Possibles

### Si "Supabase credentials missing"
→ Ajouter les secrets dans GitHub Settings

### Si "Permission denied" sur Supabase
→ Désactiver RLS ou ajouter policies (voir ci-dessus)

### Si "Rate limit exceeded" (Nominatim)
→ Le code respecte déjà la limite. Erreur rare.

### Si "Timeout"
→ Augmenter le timeout dans le workflow :

```yaml
# .github/workflows/scrape-rates.yml
jobs:
  scrape:
    runs-on: ubuntu-latest
    timeout-minutes: 15  # ← Ajouter cette ligne
```

## 📊 Données Attendues

Après un scraping réussi :

| Source | Tarifs |
|--------|--------|
| Public Data (Malt, Free-Work, Stack Overflow) | ~500-800 |
| Enhanced Malt | ~1500-2000 |
| Upwork | ~200-400 |
| Glassdoor | ~300-500 |
| **TOTAL** | **~2500-3700** |

## 🔔 Monitoring

Après correction, configurer des alertes :

1. **GitHub Actions Notifications**
   - Settings → Notifications → Actions
   - Cocher "Email notifications for failed workflows"

2. **Alternative : Slack/Discord webhook**
   ```yaml
   - name: Notify on failure
     if: failure()
     run: |
       curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
         -d '{"text":"⚠️ Scraping failed!"}'
   ```

## 📝 Prochaines Étapes

1. ✅ Vérifier les secrets GitHub
2. ✅ Tester localement avec `node run-scraper.js`
3. ✅ Vérifier les permissions Supabase
4. ✅ Déclencher manuellement le workflow
5. ✅ Analyser les logs en cas d'échec
