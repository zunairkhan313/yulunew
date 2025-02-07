import Checkout from '../components/OrderPage';

export const metadata = {
  title: "Checkout",
};



export default async function Order() {

  return (
    <>
      <style>{`
        body {
          background-color: white;
        }
      `}</style>
      <Checkout />
    </>
  )
}
