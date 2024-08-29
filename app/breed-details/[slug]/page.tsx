import React from "react";

const getDogDesc = async (dogName: string) => {
  const name = dogName.includes("-") ? dogName.split("-")[1] : dogName;

  const res = await fetch(`http://localhost:3001/api/dogDesc?name=${name}`);

  const response = await res.json();
  const dataResponse = response.message;
  const dataArray = dataResponse.filter((name: string) => {
    const dog = dogName.includes("-") ? dogName.split("-")[0] : dogName;
    return name.includes(dog);
  });

  return dataArray;
};

const DogDetail = async ({ params }: { params: { slug: string } }) => {
  const decodeUrl = decodeURIComponent(params.slug);
  const dogDesc = await getDogDesc(decodeUrl.split(" ").join("-"));

  return (
    <>
      <label className="flex text-lg font-bold justify-center">
        {decodeUrl}
      </label>
      <div className="flex flex-wrap gap-2 justify-center m-4">
        {dogDesc.length > 0
          ? dogDesc?.map((dog: string, index: number) => (
              <img
                src={dog}
                alt="name"
                width={100}
                height={100}
                key={index}
              ></img>
            ))
          : "Loading"}
      </div>
    </>
  );
};

export default DogDetail;
