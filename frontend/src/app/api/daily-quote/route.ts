import { NextResponse } from 'next/server';

const quotes = [
  {
    quote: "Sesungguhnya bersama kesulitan ada kemudahan.",
    source: "Al-Insyirah: 6"
  },
  {
    quote: "Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada ibu bapak.",
    source: "Al-Isra: 23"
  },
  {
    quote: "Maka nikmat Tuhanmu yang manakah yang kamu dustakan?",
    source: "Ar-Rahman: 13"
  },
  {
    quote: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
    source: "Al-Baqarah: 286"
  },
  {
    quote: "Dan mohonlah pertolongan (kepada Allah) dengan sabar dan shalat.",
    source: "Al-Baqarah: 45"
  }
];

export async function GET() {
  // Get a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return NextResponse.json(randomQuote);
} 