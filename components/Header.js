import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="/images/logo.png" alt="BisayaFlix" className="h-10" />
            <span className="text-xl font-bold text-purple-400">BisayaFlix</span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-purple-400">Home</Link>
            <Link href="/popular" className="hover:text-purple-400">Popular</Link>
            <Link href="/recent" className="hover:text-purple-400">Recent</Link>
          </nav>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search anime..." 
              className="bg-gray-700 px-4 py-2 rounded-full text-sm w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </header>
  )
    }
