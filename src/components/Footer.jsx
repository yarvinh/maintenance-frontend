import { Link } from "react-router-dom"

const Footer = (props)=>{
    return(
        <footer className="footer">
           {/* <section className=""> */}
           <div className="footer-line">
              <Link to="/" className="footer-line"><img src="maintainm.jpeg" className="name-logo" ></img> </Link>
            </div>
            {/* </section> */}
        </footer>
    )
}


export default Footer