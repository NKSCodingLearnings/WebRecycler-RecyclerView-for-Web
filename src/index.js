import './style.css';
import { WRAdapter } from "./WebRecycler.js";

class Adapter extends WRAdapter{
  constructor(){
    super();
  }
  onCreateNode(){
    let   =  console.log("onCreateNode");
    let h1 = document.createElement('h1');
    return h1;
  }
  onBindData(postion,holder){
    holder.textContent = "Title" + (postion+1);
  }
  getItemSize(){
    return 50000;

  }
}

const webRecycler = document.getElementById("webRecycler");
const adapter = new Adapter();
webRecycler.setAdapter(adapter);
// https://github.com/NKSCodingLearnings/WebRecycler-RecyclerView-for-Web.git
