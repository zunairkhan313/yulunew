

import ClientCart from '../components/ClientCart';

export const metadata = {
  title: "Cart",
};

export default async function Cart() {


  return (
    <>
      <style>{`
        body {
          background-color: white;
        }
        `}</style>
      <ClientCart />
    </>
  );
}
