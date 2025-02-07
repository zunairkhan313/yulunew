import RemoveBtn2 from "../RemoveBtn2";
import Link from "next/link";

export default function CategoriesCard({ items }) {
  return (
    <>
      <div
      
        className="border border-[#f0f0f0] p-2 mb-3 bg-body-tertiary rounded min-h-[200px]"
      >
        <Link href={`/product/?id=${items?._id}`}>
          <div className="flex flex-wrap justify-around">
            <img
              style={{ height: "250px",width:"100%" }}
              className="rounded object-cover"
              
              src={items?.image1}
              alt={"tshirts"}
            />
          </div>
          <div className="mt-4">
            <h4 className="text-[25px] ml-2 font-bold tracking-wider text-center">
              {items?.title1}
            </h4>
          </div>
          <div className="mt-2">
            <h4 className="text-[14px] ml-2 text-center">
              {items?.description1}
            </h4>
          </div>
        </Link>

        <div className="ml-1">
          <RemoveBtn2 id={items?._id} />
        </div>
      </div>
    </>
  );
}
