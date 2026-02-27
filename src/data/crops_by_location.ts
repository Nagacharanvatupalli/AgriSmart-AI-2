// Top crops by state and district in India
export const CROPS_BY_LOCATION: { [state: string]: { [district: string]: string[] } } = {
  "ANDHRA PRADESH": {
    "Anantapur": ["Groundnut", "Maize", "Cotton", "Jowar", "Castor"],
    "Chittoor": ["Sugarcane", "Groundnut", "Maize", "Cotton", "Jowar"],
    "Kadapa": ["Groundnut", "Jowar", "Maize", "Cotton", "Castor"],
    "Krishnna": ["Rice", "Sugarcane", "Groundnut", "Cotton", "Chillies"],
    "West Godavari": ["Rice", "Sugarcane", "Groundnut", "Cotton", "Jowar"],
  },
  "ARUNACHAL PRADESH": {
    "Lohit": ["Rice", "Maize", "Millet", "Groundnut"],
    "Changlang": ["Rice", "Maize", "Ginger", "Turmeric"],
  },
  "ASSAM": {
    "Barpeta": ["Rice", "Jute", "Tea", "Maize"],
    "Kamrup": ["Rice", "Jute", "Tea", "Sugarcane"],
    "Nagaon": ["Rice", "Jute", "Tea", "Maize"],
  },
  "BIHAR": {
    "East Champaran": ["Wheat", "Maize", "Sugarcane", "Gram"],
    "West Champaran": ["Wheat", "Maize", "Sugarcane", "Chickpea"],
    "Muzaffarpur": ["Maize", "Wheat", "Gram", "Lentil"],
    "Sitamarhi": ["Wheat", "Maize", "Gram", "Lentil"],
  },
  "CHHATTISGARH": {
    "Raipur": ["Rice", "Maize", "Jowar", "Gram", "Chickpea"],
    "Bilaspur": ["Rice", "Maize", "Jowar", "Gram"],
    "Durg": ["Rice", "Maize", "Jowar", "Chickpea"],
  },
  "DELHI": {
    "Central Delhi": ["Wheat", "Maize", "Gram", "Barley"],
  },
  "GOA": {
    "North Goa": ["Rice", "Coconut", "Sugarcane", "Cashew"],
    "South Goa": ["Rice", "Coconut", "Sugarcane", "Cashew"],
  },
  "GUJARAT": {
    "Ahmedabad": ["Cotton", "Groundnut", "Maize", "Wheat", "Gram"],
    "Vadodara": ["Cotton", "Groundnut", "Maize", "Gram"],
    "Surat": ["Cotton", "Groundnut", "Sugarcane", "Maize"],
    "Junagadh": ["Groundnut", "Cotton", "Gram", "Wheat"],
  },
  "HARYANA": {
    "Hisar": ["Wheat", "Maize", "Gram", "Barley", "Groundnut"],
    "Rohtak": ["Wheat", "Maize", "Gram", "Barley"],
    "Gurgaon": ["Wheat", "Maize", "Gram", "Sugarcane"],
  },
  "HIMACHAL PRADESH": {
    "Kangra": ["Wheat", "Maize", "Sugarcane", "Apple"],
    "Mandi": ["Wheat", "Maize", "Sugarcane", "Apple"],
    "Kullu": ["Wheat", "Maize", "Apple", "Pear"],
  },
  "JHARKHAND": {
    "Ranchi": ["Rice", "Maize", "Jowar", "Gram"],
    "East Singhbhum": ["Rice", "Maize", "Jowar", "Groundnut"],
    "Giridih": ["Rice", "Maize", "Jowar", "Gram"],
  },
  "KARNATAKA": {
    "Bangalore": ["Sugarcane", "Maize", "Groundnut", "Cotton", "Jowar"],
    "Mysore": ["Sugarcane", "Groundnut", "Maize", "Jowar"],
    "Belgaum": ["Jowar", "Maize", "Gram", "Groundnut"],
    "Kolar": ["Sugarcane", "Maize", "Groundnut", "Jowar"],
  },
  "KERALA": {
    "Ernakulam": ["Rice", "Coconut", "Tapioca", "Rubber"],
    "Thrissur": ["Rice", "Coconut", "Rubber", "Tapioca"],
    "Alappuzha": ["Rice", "Coconut", "Tapioca"],
  },
  "MADHYA PRADESH": {
    "Indore": ["Soybean", "Groundnut", "Maize", "Wheat", "Cotton"],
    "Bhopal": ["Wheat", "Maize", "Soybean", "Gram"],
    "Jabalpur": ["Gram", "Lentil", "Wheat", "Maize"],
    "Gwalior": ["Wheat", "Gram", "Maize", "Barley"],
  },
  "MAHARASHTRA": {
    "Pune": ["Sugarcane", "Jowar", "Cotton", "Groundnut"],
    "Nashik": ["Sugarcane", "Cotton", "Groundnut", "Jowar"],
    "Aurangabad": ["Cotton", "Jowar", "Sugarcane", "Groundnut"],
    "Nagpur": ["Cotton", "Jowar", "Groundnut", "Sugarcane"],
  },
  "MANIPUR": {
    "Imphal East": ["Rice", "Maize", "Millet"],
    "Imphal West": ["Rice", "Maize", "Millet"],
  },
  "MEGHALAYA": {
    "East Khasi Hills": ["Rice", "Maize", "Millet"],
    "West Khasi Hills": ["Rice", "Maize", "Millet"],
  },
  "MIZORAM": {
    "Aizawl": ["Rice", "Maize", "Millet"],
    "Lunglei": ["Rice", "Maize", "Millet"],
  },
  "NAGALAND": {
    "Kohima": ["Rice", "Maize", "Millet"],
    "Dimapur": ["Rice", "Maize", "Millet"],
  },
  "ODISHA": {
    "Cuttack": ["Rice", "Sugarcane", "Groundnut", "Maize"],
    "Baleshwar": ["Rice", "Sugarcane", "Jute", "Maize"],
    "Ganjam": ["Rice", "Sugarcane", "Groundnut", "Jowar"],
  },
  "PUNJAB": {
    "Ludhiana": ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton"],
    "Amritsar": ["Wheat", "Rice", "Maize", "Gram"],
    "Jalandhar": ["Wheat", "Rice", "Maize", "Sugarcane"],
  },
  "RAJASTHAN": {
    "Jaipur": ["Maize", "Groundnut", "Gram", "Wheat"],
    "Jodhpur": ["Groundnut", "Jowar", "Maize", "Wheat"],
    "Ajmer": ["Groundnut", "Maize", "Gram", "Wheat"],
    "Barmer": ["Jowar", "Groundnut", "Wheat", "Gram"],
  },
  "SIKKIM": {
    "East Sikkim": ["Rice", "Maize", "Millet", "Cardamom"],
    "West Sikkim": ["Rice", "Maize", "Cardamom"],
  },
  "TAMIL NADU": {
    "Chennai": ["Rice", "Sugarcane", "Groundnut", "Cotton"],
    "Coimbatore": ["Cotton", "Sugarcane", "Groundnut", "Jowar"],
    "Madurai": ["Rice", "Sugarcane", "Groundnut", "Cotton"],
  },
  "TELANGANA": {
    "Hyderabad": ["Rice", "Cotton", "Groundnut", "Maize"],
    "Warangal": ["Rice", "Cotton", "Jowar", "Maize"],
    "Medak": ["Rice", "Cotton", "Groundnut", "Jowar"],
  },
  "TRIPURA": {
    "West Tripura": ["Rice", "Jute", "Tea", "Maize"],
    "South Tripura": ["Rice", "Jute", "Tea", "Maize"],
  },
  "UTTAR PRADESH": {
    "Lucknow": ["Wheat", "Rice", "Maize", "Sugarcane", "Gram"],
    "Meerut": ["Wheat", "Maize", "Sugarcane", "Gram"],
    "Kanpur": ["Wheat", "Rice", "Maize", "Gram"],
    "Agra": ["Wheat", "Sugarcane", "Maize", "Gram"],
  },
  "UTTARAKHAND": {
    "Almora": ["Wheat", "Maize", "Barley", "Gram"],
    "Nainital": ["Wheat", "Maize", "Barley", "Gram"],
    "Dehradun": ["Wheat", "Maize", "Sugarcane", "Gram"],
  },
  "WEST BENGAL": {
    "Kolkata": ["Rice", "Jute", "Tea", "Maize"],
    "Darjeeling": ["Rice", "Tea", "Maize", "Cardamom"],
    "Jalpaiguri": ["Rice", "Tea", "Jute", "Maize"],
  },
};

// Get top crops for a location sorted by popularity/fame in that district
export const getTopCropsForLocation = (state: string, district: string): string[] => {
  const topCrops = CROPS_BY_LOCATION[state]?.[district];
  
  // Define the ranking of crops by fame/demand in each location
  const cropRanking: { [key: string]: { [key: string]: string[] } } = {
    "ANDHRA PRADESH": {
      "Anantapur": ["Groundnut", "Cotton", "Jowar", "Maize", "Castor"],
      "Chittoor": ["Sugarcane", "Groundnut", "Cotton", "Maize", "Jowar"],
      "Kadapa": ["Groundnut", "Cotton", "Jowar", "Maize", "Castor"],
      "Krishnna": ["Rice", "Sugarcane", "Cotton", "Groundnut", "Chillies"],
      "West Godavari": ["Rice", "Sugarcane", "Cotton", "Groundnut", "Jowar"],
    }
  };

  return cropRanking[state]?.[district] || topCrops || ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton"];
};
