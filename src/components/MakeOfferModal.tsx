import { useState, useEffect, useRef } from "react";
import { X, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useUltraWallet } from "../hooks/useUltraWallet";

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  uniq: {
    id: string;
    name: string;
    image: string;
    currentPrice: string;
    collection: string;
  };
}

const MakeOfferModal = ({ isOpen, onClose, uniq }: MakeOfferModalProps) => {
  const [offerAmount, setOfferAmount] = useState("");
  const [expirationDays, setExpirationDays] = useState("7");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { isConnected, blockchainId, signTransaction, connect } = useUltraWallet();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const resetModal = () => {
    setOfferAmount("");
    setExpirationDays("7");
    setError("");
    setSuccess(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const currentPriceValue = parseFloat(uniq.currentPrice.replace(/[^\d.]/g, ""));
  const offerValue = parseFloat(offerAmount) || 0;

  const validateOffer = () => {
    if (!offerAmount || offerValue <= 0) {
      setError("Veuillez entrer un montant d'offre valide");
      return false;
    }
    
    if (offerValue >= currentPriceValue) {
      setError("L'offre doit être inférieure au prix actuel");
      return false;
    }

    if (offerValue < currentPriceValue * 0.1) {
      setError("L'offre doit être au moins 10% du prix actuel");
      return false;
    }

    if (!expirationDays || parseInt(expirationDays) < 1 || parseInt(expirationDays) > 30) {
      setError("L'expiration doit être entre 1 et 30 jours");
      return false;
    }

    return true;
  };

  const handleSubmitOffer = async () => {
    if (!validateOffer()) return;

    if (!isConnected) {
      const connected = await connect();
      if (!connected) {
        setError("Connexion au wallet requise");
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Créer la transaction d'offre
      const offerTransaction = {
        action: "makeoffer",
        contract: "uniq.ultra",
        data: {
          offerer: blockchainId,
          token_id: uniq.id,
          price: `${offerValue.toFixed(2)} UOS`,
          expiration: new Date(Date.now() + parseInt(expirationDays) * 24 * 60 * 60 * 1000).toISOString(),
          memo: `Offre pour ${uniq.name}`
        }
      };

      const result = await signTransaction(offerTransaction);
      
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError("Échec de la soumission de l'offre");
      }
    } catch (err) {
      setError("Erreur lors de la soumission de l'offre");
      console.error("Offer submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-[#7A52D1]/30 p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Faire une Offre</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Offre Soumise!</h3>
            <p className="text-gray-300">
              Votre offre de {offerAmount} UOS a été soumise avec succès.
            </p>
          </div>
        ) : (
          <>
            {/* UNIQ Info */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={uniq.image}
                  alt={uniq.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-white font-bold">{uniq.name}</h3>
                  <p className="text-gray-400 text-sm">{uniq.collection}</p>
                  <p className="text-[#7A52D1] text-sm">Prix actuel: {uniq.currentPrice}</p>
                </div>
              </div>
            </div>

            {/* Offer Form */}
            <div className="space-y-6">
              {/* Offer Amount */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Montant de l'offre (UOS)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#7A52D1] focus:outline-none transition-colors"
                  />
                </div>
                {offerValue > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">
                      ≈ ${(offerValue * 20).toLocaleString()} USD
                    </span>
                    {offerValue < currentPriceValue && (
                      <span className="ml-2 text-yellow-400">
                        ({(((currentPriceValue - offerValue) / currentPriceValue) * 100).toFixed(1)}% en dessous du prix)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Expiration */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Expiration
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={expirationDays}
                    onChange={(e) => setExpirationDays(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:border-[#7A52D1] focus:outline-none transition-colors appearance-none"
                  >
                    <option value="1">1 jour</option>
                    <option value="3">3 jours</option>
                    <option value="7">7 jours</option>
                    <option value="14">14 jours</option>
                    <option value="30">30 jours</option>
                  </select>
                </div>
                <p className="mt-1 text-gray-400 text-xs">
                  Votre offre expirera automatiquement après cette période
                </p>
              </div>

              {/* Wallet Connection Status */}
              {!isConnected && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">
                      Connexion au wallet requise pour soumettre l'offre
                    </span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmitOffer}
                disabled={isSubmitting || (!isConnected && !offerAmount)}
                className="w-full bg-gradient-to-r from-[#7A52D1] to-violet-600 hover:from-[#6A42C1] hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Soumission...</span>
                  </div>
                ) : (
                  "Soumettre l'Offre"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MakeOfferModal; 