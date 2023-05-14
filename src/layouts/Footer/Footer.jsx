import './Footer.sass';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className="footer__copyright">{`© ${new Date().getFullYear()}, Ruslan Gaziev`}</p>
      <a className="footer__github" href="https://github.com/gazievri/apollo-todo" target="blank">Github</a>
    </footer>
  )
}

export default Footer;