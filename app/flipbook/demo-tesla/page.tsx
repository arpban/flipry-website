import Flipbook from "../../components/Flipbook";

export default function FlipbookPage() {
  return (
    <div className="w-full h-screen bg-zinc-50 font-sans">
      <Flipbook demoPath="/demos/tesla" />
    </div>
  );
}
