function Footer() {
  const year = new Date().getFullYear();

  return <p className="fixed left-0 bottom-0 right-0 text-center dark:text-white my-5">Copyright &copy; {year}</p>;
}

export default Footer;
