import RemoveBtn2 from "../components/RemoveBtn2";
import Link from "next/link";

export default function FrontCategoriesCard({ items }) {
  return (
    <>
      <div
        style={{ height: "100%", width: 300 }}
        className="mt-5 shadow p-3 mb-5 bg-body-tertiary rounded"
      >
        <Link href={`/product/?id=${items?._id}`}>
          <div className="flex flex-wrap justify-around">
            <img
              style={{ height: "250px" }}
              className="rounded object-cover"
              width={300}
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
