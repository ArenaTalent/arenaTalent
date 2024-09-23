// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { ArrowLeftIcon, BellIcon, MoreVerticalIcon, PaperclipIcon, SearchIcon, SendIcon, StarIcon } from "lucide-react"

// export default function MessagingApp() {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left panel - Conversation list */}
//       <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
//         <div className="p-4 border-b border-gray-200">
//           <h1 className="text-xl font-semibold">Messages</h1>
//           <div className="mt-2 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <Input className="pl-10" placeholder="Search messages" />
//           </div>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
//               <Avatar className="h-12 w-12">
//                 <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="User avatar" />
//                 <AvatarFallback>U</AvatarFallback>
//               </Avatar>
//               <div className="ml-4 flex-1">
//                 <h3 className="text-sm font-medium">User Name</h3>
//                 <p className="text-sm text-gray-500 truncate">Message preview...</p>
//               </div>
//               <span className="text-xs text-gray-400">2:40 PM</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right panel - Conversation view */}
//       <div className="flex-1 flex flex-col">
//         <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <Button variant="ghost" size="icon" className="mr-2">
//               <ArrowLeftIcon className="h-5 w-5" />
//             </Button>
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="User avatar" />
//               <AvatarFallback>JM</AvatarFallback>
//             </Avatar>
//             <div className="ml-3">
//               <h2 className="text-sm font-medium">Jan Mayer</h2>
//               <p className="text-xs text-gray-500">Recruiter at Arena</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon">
//               <StarIcon className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <BellIcon className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <MoreVerticalIcon className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           <Card className="p-4 max-w-[80%]">
//             <p className="text-sm">Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.</p>
//             <p className="text-sm mt-2">We want to invite you for a quick interview</p>
//             <p className="text-xs text-gray-400 mt-1">12 mins ago</p>
//           </Card>
//           <Card className="p-4 max-w-[80%] ml-auto bg-purple-100">
//             <p className="text-sm">Hi Jan, sure I would love to. Thanks for reaching out, I look forward to our meeting!</p>
//             <p className="text-xs text-gray-400 mt-1">12 mins ago</p>
//           </Card>
//         </div>
//         <div className="bg-white border-t border-gray-200 p-4">
//           <div className="flex items-center">
//             <Input className="flex-1" placeholder="Type a message..." />
//             <Button variant="ghost" size="icon" className="ml-2">
//               <PaperclipIcon className="h-5 w-5" />
//             </Button>
//             <Button size="icon" className="ml-2">
//               <SendIcon className="h-5 w-5" />
//             </Button>
//           </div>
//           <p className="text-xs text-center text-purple-600 mt-2">
//             You have 3 more messages remaining this month
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
