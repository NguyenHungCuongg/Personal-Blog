function BlogContent(Props) {
  return (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} className="fs-5">
      {Props.content}
    </div>
  );
}

export default BlogContent;
