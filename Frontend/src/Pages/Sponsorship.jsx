import React, { useState } from "react";
import { BadgeCheck, XCircle } from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { useSponsorship } from "../Hooks/useSponsorship";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner";

const plans = [
  {
    duration: "1 Month",
    price: 150,
    banner: "No Banner Display",
    savings: "₹0",
  },
  {
    duration: "3 Months",
    price: 250,
    banner: "No Banner Display",
    savings: "₹200",
  },
  {
    duration: "6 Months",
    price: 450,
    banner: "1 Month Banner Display",
    savings: "₹450 from ₹1 month rate or ₹50 from 3-month rate",
  },
  {
    duration: "1 Year",
    price: 800,
    banner: "3 Months Banner Display",
    savings: "₹1000",
  },
  {
    duration: "2 Years",
    price: 1350,
    banner: "6 Months Banner Display",
    savings: "₹2250",
  },
];

function Sponsorship() {
  const [sponsorshipDetails, setSponsorshipDetails] = useState({
    sponsoredBy: "",
    planType: "",
    pricePaid: "",
    banner: "",
    savings: ""
  });
  const [showModel, setShowModel] = useState(false);
  const { productId } = useParams();

  return (
    <div className="h-[85vh] bg-gradient-to-r from-purple-100 to-blue-100 py-10 px-4 md:px-10 overflow-y-auto scrollbar-hide">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Sponsorship Plans
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isPremium = ["6 Months", "1 Year", "2 Years"].includes(plan.duration);

          return (
            <div
              key={index}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${isPremium && "animate-[pulse-glow_2s_infinite]"} ${
                isPremium
                  ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                  : "bg-white shadow-xl"
              }`}
            >
              {isPremium && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  <FaCrown className="inline mr-1" /> Premium
                </div>
              )}

              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                {plan.duration}
                {isPremium && <FaCrown className="text-yellow-500" />}
              </h2>

              <p className="text-2xl font-bold text-blue-600 mb-4">₹{plan.price}</p>

              <ul className="list-disc list-outside pl-5 text-gray-600 space-y-1">
                <li>
                  <span className="font-medium">Sponsorship Duration:</span> {plan.duration}
                </li>
                <li>
                  <span className="font-medium">Banner Display:</span> {plan.banner}
                </li>
              </ul>

              <button
                onClick={() => {
                  setSponsorshipDetails({
                    sponsoredBy: "novaMart",
                    planType: plan.duration,
                    pricePaid: plan.price,
                    banner: plan.banner,
                    savings: plan.savings
                  });
                  setShowModel(true);
                }}
                className={`mt-6 w-full font-semibold py-2 rounded-xl transition-all cursor-pointer ${
                  isPremium
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Choose Plan
              </button>
            </div>
          );
        })}
      </div>

      {showModel && (
        <SponsorshipAlertModel
          productId={productId}
          sponsorshipDetails={sponsorshipDetails}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      )}
    </div>
  );
}

export default Sponsorship;


const SponsorshipAlertModel = ({
  productId,
  sponsorshipDetails,
  showModel,
  setShowModel
}) => {
  const [loader, setLoader] = useState(false);
  const sponsorship = useSponsorship();

  const handleSponsorShip = () => {
    console.log(sponsorshipDetails);
    sponsorship(productId, sponsorshipDetails, setLoader);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm ${showModel ? "flex" : "hidden"} items-center justify-center z-50`}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <BadgeCheck className="text-green-600 w-6 h-6" />
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Sponsorship
          </h2>
        </div>

        <div className="text-gray-700 text-sm">
          Are you sure you want to proceed with the <span className="font-semibold">{sponsorshipDetails.planType}</span> plan for this product?
        </div>

        <div className="border rounded-lg bg-gray-50 p-3">
          <ul className="list-disc list-outside pl-5 text-sm text-gray-600 space-y-1">
            <li>
              <span className="font-medium">Sponsorship Duration:</span> {sponsorshipDetails.planType}
            </li>
            <li>
              <span className="font-medium">Banner Display:</span> {sponsorshipDetails.banner}
            </li>
            <li>
              <span className="font-medium">Price:</span> ₹{sponsorshipDetails.pricePaid}
            </li>
            <li>
              <span className="font-medium">You Save:</span> {sponsorshipDetails.savings}
            </li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setShowModel(false)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 border border-gray-300 rounded-lg hover:bg-red-50 transition"
          >
            <XCircle className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={handleSponsorShip}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow transition"
          >
            {loader && <Spinner />} Confirm
          </button>
        </div>
      </div>
    </div>
  );
};