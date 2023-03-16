import RecommendedAlbums from "../../components/MainInterface/RecommendedAlbums";
import History from "../../components/MainInterface/History";
import '../../components/MainInterface/MainInterface.css'

export default function Main_Interface({ data }) {
  console.log(data);

  return (
    <div className="interface_inside main_section_container">
      <RecommendedAlbums />
      <History />
    </div>
  );
}
