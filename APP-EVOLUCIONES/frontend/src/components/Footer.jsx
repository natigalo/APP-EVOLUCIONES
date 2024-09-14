/* import logo2 from "/Images/logo2.png"
import instagram from "/Images/instagram.png"
import facebook from "/Images/facebook.png"
import youtube from "/Images/youtube.png"
import payment from "/Images/mercadoPago.png"

export default function Footer() {
  return (
    <footer className="justify-between w-full md:h-[500px] h-full md:flex-row flex-col-reverse flex ">
      <div className="md:w-5/12 w-full text-white bg-blue text-center flex flex-col items-center justify-around pb-5">
        <img className="" src={logo2} alt='logo' />
        <p className="text-xl font-bold px-5 py-5">Ignite Your Momentum, Elevate Your Sports!</p>
        <p>© Copyright</p>
      </div>
      <div className="md:w-5/12 w-full bg-white flex flex-col h-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="pt-4 text-2xl font-bold">Payment Methods</p>
          <img src={payment} className="mt-5" alt="" />
        </div>

        <div className="border border-solid border-gray-400"></div>

        <div className="w-full h-full py-5 flex justify-around">
          <div>
            <p className="text-xl font-bold">Products</p>
            <p>Accesories</p>
            <p>Sportswear</p>
            <p>Sports shoes</p>
            <p>Sports backpacks</p>
            <p>Sports Equipment</p>
          </div>
          <div>
            <p className="text-xl font-bold">Company Information</p>
            <p>About Us</p>
            <p>Mission & Vision</p>
          </div>

        </div>
      </div>
      <div className="md:w-1/12 w-full bg-blue p-2 md:h-full flex md:flex-col justify-around items-center">
        <img src={instagram} className="w-[50px] h-[50px]" alt="" />
        <img src={facebook} className="w-[65px] h-[60px]" alt="" />
        <img src={youtube} className="w-[50px] h-[50px]" alt="" />
      </div>
    </footer>

  )
}
 */