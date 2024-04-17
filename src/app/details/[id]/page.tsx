type Props = {
  params: { id: number };
};
export default function DetailsPage({ params }: Props) {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil excepturi
      cupiditate id eius nulla molestias, facilis in laborum architecto
      repudiandae et ipsum dolore? Dignissimos exercitationem expedita,
      molestias explicabo nihil veniam.
      <h1> heres is id : {params.id}</h1>
    </div>
  );
}
