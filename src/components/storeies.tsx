import React from "react";
import Stories from "stories-react";
import "stories-react/dist/index.css";
interface PropsStories {
  stories?: [
    {
      viewerDto?: any;
      id?: number;
      fileName?: any;
      postId?: any;
      createAt?: any;
      userId: any;
    },
  ];
}
const ImagesStories: React.FC<PropsStories> = (props) => {
  console.log(
    props.stories?.map((el) => {
      console.log(el);
    }),
  );

  const stories = [
    {
      type: "image",
      url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
      duration: 5000,
    },
    {
      type: "image",
      duration: 6000,
      url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
    },
    {
      duration: 7000,
      type: "image",
      url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
    },
  ];

  return <Stories width="400px" height="600px" stories={stories} />;
};

export default ImagesStories;
