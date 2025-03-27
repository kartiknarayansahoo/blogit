import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { CreateBlog } from './pages/CreateBlog'
import { Blogs } from './pages/Blogs'
import { InvalidPage } from './pages/InvalidPage'
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {

  return (
    <div className='selection:bg-violet-300 selection:text-violet-800'>
      <SpeedInsights />
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin></Signin>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          <Route path='/createblog' element={<CreateBlog />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path="/" element={<Signin />} />
          <Route path='/*' element={<InvalidPage></InvalidPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
