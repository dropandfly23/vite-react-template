// Wedding Data Configuration
// Customize all wedding details here

import music from "../assets/mp3/music.mp3";

export const coupleInfo = {
  partner1: "Anouk",
  partner2: "Nidal",
  hashtag: "#AnoukAndNidal",
  story: "Our love story began in France...",
};

export const weddingDate = new Date("2026-09-22T16:00:00");

export const weddingDetails = {
  ceremony: {
    title: "The Ceremony",
    date: "September 22, 2026",
    time: "4:00 PM",
    venue: "Centre Commune Oulad Ghanem",
    address: "Exact location will be sent to your phone later on.",
    description: "Join us in a celebration with friends and family.",
  },
  reception: {
    title: "The Reception",
    date: "September 22, 2026",
    time: "6:00 PM",
    venue: "Centre Commune Oulad Ghanem",
    address: "Exact location will be sent to your phone later on.",
    description: "Celebrate with us over dinner, drinks, and dancing under the stars.",
  },
  dressCode: "Formal Attire",
  dressCodeDescription: "We kindly request formal attire or traditional clothes.",
};

export const venueLocation = {
  lat: 32.8749287144863,
  lng: -8.857845076151674,
  name: "Centre Commune Oulad Ghanem",
  address: "Exact location will be sent to your phone later on.",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Centre%20Commune%20Oulad%20Ghanem",
};

export const timelineEvents = [
  {
    time: "4:00 PM",
    title: "Ceremony",
    description: "Celebrate our union with us in a beautiful garden setting",
    icon: "heart",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    description: "Enjoy welcome drinks",
    icon: "wine",
  },
  {
    time: "6:00 PM",
    title: "Dinner",
    description: "Savor a delicious farm-to-table feast",
    icon: "utensils",
  },
  {
    time: "8:00 PM",
    title: "First Dance",
    description: "Our first dance as a married couple",
    icon: "music",
  },
  {
    time: "8:30 PM",
    title: "Party",
    description: "Party time...",
    icon: "sparkles",
  },
];

export const faqItems = [
  {
    question: "What time should guests arrive?",
    answer: "We kindly ask that all guests arrive by 3:45 PM to be seated before the ceremony begins at 4:00 PM. This will give you time to find your seat and settle in.",
  },
  {
    question: "Is there parking available?",
    answer: "Yes! Parking will be available at the venue.",
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to venue capacity, we are only able to accommodate those guests formally invited. Please refer to your invitation for details on your party size.",
  },
  {
    question: "What is the dress code?",
    answer: "We request formal attire for our celebration. Ladies are welcome in floor-length gowns or elegant cocktail dresses, and gentlemen in suits or tuxedos. We recommend comfortable shoes for dancing!",
  },
  {
    question: "Will the ceremony be indoors or outdoors?",
    answer: "The ceremony will be held outdoors in the garden. In case of inclement weather, we have a beautiful indoor backup space. We'll notify guests via email if plans change.",
  },
  {
    question: "Are children welcome?",
    answer: "While we love your little ones, our wedding is an adults-only celebration (except Aida). We hope this gives you the opportunity to relax and enjoy the evening.",
  },
  {
    question: "What if I have dietary restrictions?",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer: "We kindly ask for an unplugged ceremony. Our photographer will capture all the special moments, and we'll share photos with you after the wedding. Feel free to take photos during the reception!",
  },
];

export const musicTrack = {
  title: "Perfect",
  artist: "Ed Sheeran",
  // Note: In a real implementation, you would use a proper audio file
  // For demo purposes, this is a placeholder URL
  url: music,
};
