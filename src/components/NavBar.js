import React from 'react'
import { Link,useLocation,useNavigate} from "react-router-dom";

const NavBar = () => {
    let navigate = useNavigate();
    const handlelogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }
    let location = useLocation();
  
    return (
        <>
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-warning">
                <div className="container-fluid">
                       <a className="navbar-brand" href="/">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53K9N8zHCT83D67nH228rxKxkS6RMojtknA&usqp=CAU" alt="" width="30" height="24"/>
                        </a>
                    <Link className="navbar-brand" to="/" style={{color:"black"}}>Get Knowledge</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/" style={{color:"black"}}>Home</Link>
                            </li>
                            <li className="nav-item "><Link className="nav-link" to="/business" style={{color:"black"}}>Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment" style={{color:"black"}}>Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/health" style={{color:"black"}}>Health</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/science" style={{color:"black"}}>Science</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sports" style={{color:"black"}}>Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/technology" style={{color:"black"}}>Technology</Link></li>
                            <Link className={`nav-link d-flex flex-row-reverse ${location.pathname==="/TakeNote"? "active":""}`} aria-current="page" to="/TakeNote" style={{color:"black"}} >TakeNote</Link>
                        </ul>
                    </div>
                </div>
                <div className='mx-3'>
                        <ul>
                        {!localStorage.getItem('token') ?<form className="d-flex flex-row">
                            <Link className='btn btn-dark mx-2' to="/login" roles="button">Login</Link>
                            <Link className='btn btn-dark mx-2' to="/signup" roles="button">signup</Link>
                            </form> : <button onClick={handlelogout} className='btn btn-dark'>Logout</button>}
                        </ul>
                </div>
            </nav>
        </div>

        
        </>
    )

}

export default NavBar
