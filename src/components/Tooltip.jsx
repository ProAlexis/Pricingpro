import { useState, useRef, useEffect } from "react";
import { HelpCircle, Info } from "lucide-react";

const Tooltip = ({
  content,
  language = "fr",
  variant = "help", // 'help' ou 'info'
  position = "top", // 'top', 'bottom', 'left', 'right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  // Calculer la position du tooltip
  useEffect(() => {
    if (isVisible && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top, left;

      switch (position) {
        case "bottom":
          top = buttonRect.bottom + 8;
          left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = buttonRect.top + buttonRect.height / 2 - tooltipRect.height / 2;
          left = buttonRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = buttonRect.top + buttonRect.height / 2 - tooltipRect.height / 2;
          left = buttonRect.right + 8;
          break;
        case "top":
        default:
          top = buttonRect.top - tooltipRect.height - 8;
          left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;
          break;
      }

      // S'assurer que le tooltip reste dans la fenêtre
      if (left < 8) left = 8;
      if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
      }

      setTooltipPosition({ top, left });
    }
  }, [isVisible, position]);

  const Icon = variant === "info" ? Info : HelpCircle;

  return (
    <div className="relative inline-block">
      {/* Bouton déclencheur */}
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={`
          inline-flex items-center justify-center
          w-5 h-5 rounded-full
          transition-all duration-200
          ${
            variant === "info"
              ? "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              : "text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          }
        `}
        aria-label={language === "fr" ? "Aide" : "Help"}
      >
        <Icon className="w-4 h-4" />
      </button>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            zIndex: 9999,
          }}
          className="animate-fadeIn"
        >
          <div
            className={`
            max-w-xs px-4 py-3 rounded-xl shadow-2xl
            bg-gray-900 dark:bg-gray-800
            text-white text-sm
            border border-gray-700
          `}
          >
            {/* Flèche du tooltip */}
            <div
              className={`
                absolute w-2 h-2 bg-gray-900 dark:bg-gray-800 border-gray-700
                transform rotate-45
                ${
                  position === "top"
                    ? "bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r"
                    : ""
                }
                ${
                  position === "bottom"
                    ? "top-[-5px] left-1/2 -translate-x-1/2 border-t border-l"
                    : ""
                }
                ${
                  position === "left"
                    ? "right-[-5px] top-1/2 -translate-y-1/2 border-r border-t"
                    : ""
                }
                ${
                  position === "right"
                    ? "left-[-5px] top-1/2 -translate-y-1/2 border-l border-b"
                    : ""
                }
              `}
            />

            {/* Contenu */}
            <div className="relative z-10">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tooltips prédéfinis pour PricingPro
export const TooltipContent = {
  profession: {
    fr: (
      <div>
        <p className="font-semibold mb-1">Pourquoi c'est important ?</p>
        <p>
          Votre profession détermine le tarif de base du marché. Nous analysons
          1000+ tarifs réels pour chaque métier.
        </p>
      </div>
    ),
    en: (
      <div>
        <p className="font-semibold mb-1">Why is this important?</p>
        <p>
          Your profession determines the base market rate. We analyze 1000+ real
          rates for each profession.
        </p>
      </div>
    ),
  },
  location: {
    fr: (
      <div>
        <p className="font-semibold mb-1">Impact géographique</p>
        <p>
          Les tarifs varient selon les pays et les villes. Paris = +20%,
          Lisbonne = -30%, Londres = +30%.
        </p>
      </div>
    ),
    en: (
      <div>
        <p className="font-semibold mb-1">Geographic impact</p>
        <p>
          Rates vary by country and city. Paris = +20%, Lisbon = -30%, London =
          +30%.
        </p>
      </div>
    ),
  },
  experience: {
    fr: (
      <div>
        <p className="font-semibold mb-1">Années d'expérience</p>
        <p>
          Chaque année d'expérience augmente votre valeur de ~8%. Soyez honnête
          pour obtenir un tarif réaliste.
        </p>
      </div>
    ),
    en: (
      <div>
        <p className="font-semibold mb-1">Years of experience</p>
        <p>
          Each year of experience increases your value by ~8%. Be honest to get
          a realistic rate.
        </p>
      </div>
    ),
  },
  experienceLevel: {
    fr: (
      <div>
        <p className="font-semibold mb-1">Niveau d'expertise</p>
        <ul className="space-y-1 text-xs mt-2">
          <li>
            • <strong>Junior:</strong> 0-2 ans, apprentissage
          </li>
          <li>
            • <strong>Confirmé:</strong> 3-7 ans, autonome
          </li>
          <li>
            • <strong>Senior:</strong> 8+ ans, expert reconnu
          </li>
        </ul>
      </div>
    ),
    en: (
      <div>
        <p className="font-semibold mb-1">Expertise level</p>
        <ul className="space-y-1 text-xs mt-2">
          <li>
            • <strong>Junior:</strong> 0-2 years, learning
          </li>
          <li>
            • <strong>Mid-level:</strong> 3-7 years, autonomous
          </li>
          <li>
            • <strong>Senior:</strong> 8+ years, recognized expert
          </li>
        </ul>
      </div>
    ),
  },
  skills: {
    fr: (
      <div>
        <p className="font-semibold mb-1">Compétences valorisées</p>
        <p>
          Chaque compétence rare ou demandée ajoute +30€/jour à votre tarif.
          Listez celles qui vous différencient.
        </p>
      </div>
    ),
    en: (
      <div>
        <p className="font-semibold mb-1">Valued skills</p>
        <p>
          Each rare or in-demand skill adds +€30/day to your rate. List those
          that differentiate you.
        </p>
      </div>
    ),
  },
  legalStatus: {
    fr: (
      <div>
        <p className="font-semibold mb-1">Statut juridique</p>
        <ul className="space-y-1 text-xs mt-2">
          <li>
            • <strong>Auto-entrepreneur:</strong> ~22% de charges
          </li>
          <li>
            • <strong>SASU:</strong> ~54% de charges totales
          </li>
          <li>
            • <strong>EURL:</strong> ~45% de charges TNS
          </li>
          <li>
            • <strong>Portage:</strong> ~49% tout inclus
          </li>
        </ul>
      </div>
    ),
    en: (
      <div>
        <p className="font-semibold mb-1">Legal status</p>
        <ul className="space-y-1 text-xs mt-2">
          <li>
            • <strong>Self-employed:</strong> ~22% contributions
          </li>
          <li>
            • <strong>SASU:</strong> ~54% total contributions
          </li>
          <li>
            • <strong>EURL:</strong> ~45% TNS contributions
          </li>
          <li>
            • <strong>Umbrella:</strong> ~49% all inclusive
          </li>
        </ul>
      </div>
    ),
  },
};

export default Tooltip;
