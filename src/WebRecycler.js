class WebRecycler extends HTMLElement{
    adapter = null; dataSize = 0;;
    container; holders = [];firstTime = false;
    constructor(){
        // For checking that git working properly or not
        super();
        // just
        this.container = document.createElement('div');
        let y = 0;
        this.observer = new IntersectionObserver((entries,observer)=>{
            for (let i = 0; i < entries.length; i++) {
                const entrie = entries[i];
                if (entrie.target.firstTime) {
                    entrie.target.firstTime = false;
                }else{
                    if (entrie.isIntersecting) {
                        if (entrie.rootBounds.bottom<=entrie.boundingClientRect.bottom) {
                            // come in from bottom side
                            let last = this.container.lastElementChild;
                            let p = last.position + 1;
                            if(p<this.dataSize){
                                let holder = this.getHolder();
                                this.adapter.onBindData(p,holder);
                                this.container.appendChild(holder);
                                holder.position = p;
                                if (holder.firstTime === undefined) {
                                    this.observer.observe(holder);
                                    holder.firstTime = true;
                                }
                            }
                        }else{
                            // come in from top side
                            let last = this.container.firstElementChild;
                            let p = last.position - 1;
                            if(p>=0){
                                let holder = this.getHolder();
                                this.adapter.onBindData(p,holder);
                                this.container.insertBefore(holder,last);
                                holder.position = p;
                                if (holder.firstTime === undefined) {
                                    this.observer.observe(holder);
                                    holder.firstTime = true;
                                }
                            }
                        }
                    }else{
                        if(this.clientHeight + 200 <= this.container.clientHeight){
                            let toRemove;
                            if (entrie.rootBounds.bottom<=entrie.boundingClientRect.bottom) {
                                // go out from bottom side
                                toRemove = this.container.lastElementChild;
                            }else{
                                toRemove = this.container.firstElementChild;
                                // come out from top side
                            }
                            toRemove.remove();
                            this.holders.push(toRemove);
                        }
                    }
                }
            }
        },{root:this,rootMargin:'100px'});
    }
    setAdapter(adap){
        console.log("setAdapter");
        this.adapter = adap;
        this.dataSize = adap.getItemSize();
        if (this.isConnected) {
            if(0<this.dataSize) this.createAtFirstTime();
        }
    }
    connectedCallback(){
        this.appendChild(this.container);
        if(this.adapter !== null) {
            this.dataSize = this.adapter.getItemSize();
            if(0<this.dataSize) this.createAtFirstTime();
        }
    }
    createAtFirstTime(){
        let position = 0;
        while (this.container.clientHeight < this.clientHeight +200 && position < this.dataSize) {
            let holder = this.getHolder();
            this.adapter.onBindData(position,holder);
            this.container.appendChild(holder);
            holder.position = position;
            if (holder.firstTime === undefined) {
                this.observer.observe(holder);
                holder.firstTime = true;
            }
            position++;
        }
    }
    getHolder(){
        let holder = this.holders.pop();
        if(!holder){
            holder = this.adapter.onCreateNode();
        }   
        return holder;
    }
}
customElements.define('web-recycler',WebRecycler);
export class WRAdapter {
    constructor(){}
    onCreateNode(){}
    onBindData(position,holder){}
    getItemSize(){}
}
