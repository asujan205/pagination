function Post(props) {
  const { name,url} = props.data;
  return (
    <div className="post">
      
      <h1>{name}</h1>
      <p>{url}</p>
    </div>
  );
}
export default Post;