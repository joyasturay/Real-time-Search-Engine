"use client"
import { useState,useEffect } from "react";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";
type Dictionary={
  id:string,
  koreanWord:string,
  englishWord:string
}
export default function Home() {
  const[word,setWord]=useState("")
  const debouncedWord = useDebounce(word, 500);
  const[error,setError]=useState("")
  const[loading,setLoading]=useState(false)
  const[result,setResult]=useState("")
  const[suggestions,setSuggestions]=useState<Dictionary[]>([])
  async function findWord(){
    setLoading(true)
    setError("")
    setSuggestions([])
    try{
      const res=await axios.get(`/api/dictionary/word/?q=${word}`)
      setResult(res.data.word.koreanWord)
      
    }catch(e){
      setError("Word not found")
    }finally{
      setLoading(false)
    }
  }
  async function search(searchword:string){
    try{
      const res=await axios.get(`/api/dictionary/suggestions/?q=${searchword}`)
      setSuggestions(res.data.word || [])
    }catch(e){
      setSuggestions([])
    }
  }
  useEffect(() => {
   if (debouncedWord) {
     search(debouncedWord)
   }else{
    setSuggestions([])
   }
}, [debouncedWord]); 
  function selectWord(suggestedword:Dictionary){
    setWord(suggestedword.englishWord)
    setResult(suggestedword.koreanWord)
    setSuggestions([])
    setError("")
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 font-sans text-white p-4">
      
      <div className="relative w-full max-w-md group">
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter English word..."
            className="w-full border border-zinc-700 rounded-full px-6 py-4 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            className="bg-blue-600 px-6 rounded-full font-medium hover:bg-blue-500 transition-colors"
            onClick={findWord}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl z-10">
            {suggestions.map((entry) => (
              <li
                key={entry.id}
                onClick={() => selectWord(entry)}
                className="px-6 py-3 hover:bg-zinc-700 cursor-pointer border-b border-zinc-700/50 last:border-none flex justify-between items-center"
              >
                <span className="text-white font-medium">{entry.englishWord}</span>
                <span className="text-zinc-500 text-sm">Select</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-red-400 mt-4">{error}</p>}
      
      {result && (
        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Translation</p>
          <h1 className="text-6xl font-bold text-blue-400">{result}</h1>
        </div>
      )}
    </div>
  );
}
