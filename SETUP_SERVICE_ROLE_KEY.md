# 🔑 Configuration de la Clé Service Role pour GitHub Actions

## ⚠️ IMPORTANT : Changement de Clé Requis

Le scraper a besoin de la clé **SERVICE_ROLE** (admin) au lieu de la clé **ANON** (publique) car il doit :
- ✅ DELETE toutes les données de `market_rates`
- ✅ INSERT en masse ~3500+ tarifs
- ✅ INSERT dans `market_rates_history`

Ces opérations sont **bloquées par le Row Level Security (RLS)** si on utilise la clé ANON.

---

## 📋 ÉTAPE 1 : Trouver votre clé Service Role

1. **Aller sur Supabase Dashboard** : https://supabase.com/dashboard

2. **Sélectionner votre projet** PricingPro

3. **Aller dans Settings** (icône ⚙️ en bas à gauche)

4. **Cliquer sur API** dans le menu latéral

5. **Copier la clé "service_role"** :
   ```
   Project API keys
   ├── anon public          ← ⚠️ Pas celle-ci !
   └── service_role         ← ✅ Copier celle-ci !
   ```

**⚠️ ATTENTION :**
- Cette clé est **secrète** et **très puissante**
- Elle bypass tous les RLS
- **NE JAMAIS** l'exposer côté client
- **NE JAMAIS** la committer dans Git
- Elle sera utilisée **uniquement** dans GitHub Actions et en local pour le scraper

---

## 📋 ÉTAPE 2 : Ajouter le Secret dans GitHub

1. **Aller sur votre repo GitHub** : https://github.com/ProAlexis/Pricingpro

2. **Cliquer sur "Settings"** (en haut)

3. **Dans le menu latéral** : `Secrets and variables` → `Actions`

4. **Cliquer sur "New repository secret"** (bouton vert)

5. **Remplir le formulaire :**
   - **Name :** `SUPABASE_SERVICE_ROLE_KEY`
   - **Secret :** Coller la clé service_role copiée à l'étape 1
   - Cliquer **"Add secret"**

**Résultat attendu :**
Vous devriez maintenant avoir **3 secrets** :
```
✅ SUPABASE_URL
✅ SUPABASE_ANON_KEY (garde-la, elle sert pour les APIs publiques)
✅ SUPABASE_SERVICE_ROLE_KEY (nouvelle - pour le scraper)
```

---

## 📋 ÉTAPE 3 : Configuration Locale (.env)

Pour tester le scraper en local, créez un fichier `.env` :

```bash
# Créer le fichier .env (SI PAS DÉJÀ FAIT)
cat > .env << 'EOF'
# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbG... (votre vraie clé)

# Email (Resend)
RESEND_API_KEY=re_...

# Turnstile
TURNSTILE_SECRET_KEY=0x...
EOF
```

**⚠️ Remplacez les valeurs par vos vraies clés !**

---

## 📋 ÉTAPE 4 : Tester Localement

```bash
# Test de connexion
node test-scraper-connection.js

# Si ✅ succès, test complet du scraper
node run-scraper.js
```

**Résultat attendu :**
```
🔑 Using key type: SERVICE_ROLE (admin)
✅ Successfully inserted 100 rates
✅ Successfully inserted 200 rates
...
✅ MASTER scraping completed successfully!
📊 TOTAL: 3500+ rates
```

---

## 📋 ÉTAPE 5 : Tester le Workflow GitHub

1. **Aller dans l'onglet "Actions"** de votre repo

2. **Sélectionner "Scrape Market Rates"**

3. **Cliquer "Run workflow"** → **Run workflow**

4. **Attendre 2-5 minutes**

5. **Vérifier les logs** :
   - ✅ "Using SERVICE_ROLE (admin)"
   - ✅ "Successfully inserted X rates"
   - ✅ "Scraping completed successfully!"

---

## 🔍 Dépannage

### ❌ "Missing Supabase credentials"
→ Le secret `SUPABASE_SERVICE_ROLE_KEY` n'est pas configuré dans GitHub

### ❌ "violates row-level security policy"
→ Vous utilisez encore la clé ANON au lieu de SERVICE_ROLE

### ❌ "Invalid API key"
→ Vérifiez que vous avez copié la **bonne clé** (service_role, pas anon)

### ✅ Tout fonctionne mais...
→ Gardez la clé ANON pour les APIs publiques (get-rates.js, save-email.js)
→ Seul le **scraper** utilise SERVICE_ROLE

---

## 📊 Récapitulatif

| Fichier | Clé Utilisée | Raison |
|---------|-------------|---------|
| `api/get-rates.js` | ✅ ANON | API publique, lecture seule |
| `api/save-email.js` | ✅ ANON | API publique, RLS activé |
| `scrapers/*` | ✅ SERVICE_ROLE | Opérations admin (DELETE/INSERT en masse) |
| `run-scraper.js` | ✅ SERVICE_ROLE | Lance les scrapers |

---

## ✅ Checklist Finale

- [ ] Clé SERVICE_ROLE copiée depuis Supabase Dashboard
- [ ] Secret `SUPABASE_SERVICE_ROLE_KEY` ajouté dans GitHub Actions
- [ ] Fichier `.env` local créé avec SERVICE_ROLE_KEY
- [ ] Test local réussi : `node test-scraper-connection.js`
- [ ] Test complet réussi : `node run-scraper.js`
- [ ] Workflow GitHub testé manuellement
- [ ] Logs confirment "Using SERVICE_ROLE (admin)"

---

## 🆘 Besoin d'Aide ?

Si vous voyez toujours des erreurs RLS après avoir suivi ces étapes :
1. Vérifiez que le secret GitHub est bien nommé `SUPABASE_SERVICE_ROLE_KEY`
2. Vérifiez que c'est bien la clé "service_role" et pas "anon"
3. Redémarrez le workflow GitHub après avoir ajouté le secret
4. Consultez `.github/SCRAPER_DIAGNOSTIC.md` pour plus de détails
