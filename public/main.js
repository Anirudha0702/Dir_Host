const dir = document.querySelector('._dir');
const editor = document.querySelector('.editor');
    const url = 'http://localhost:3000/';
    const display=(element)=>{
       const isFile=element.includes('.');
       if(isFile){
        const dt = document.createElement('dt');
            dt.textContent = element;
            dt.onclick=(event)=>clickListener(dt,event);
            dir.appendChild(dt);
       }
       else{
        const dd = document.createElement('dd');
        dd.textContent = element;
        dd.onclick=(event)=>clickListener(dd,event);
        dir.appendChild(dd)
       }
    }
    function getDomPathToRoot(node) {
        let path=[]
        while (node && !node.className.includes('_dir')){
            path.unshift('/'+node.childNodes[0].nodeValue.trim());
            node = node.parentNode;
        }
        // console.log(path.join(""))
        return path.join("");
    }
    const getDefaults=async()=>{
        try {
        const res=await fetch(url+"default")
        const data = await res.json();
        data.forEach(display)
    } catch (error) {
        window.alert(error);
    }
    }
    getDefaults()
    const clickListener=async(elem,event)=>{
        event.stopPropagation();
        let path=getDomPathToRoot(elem);
        try {
            if(!path.includes('.')){
                const res=await fetch(url+path)
            const data = await res.json();
            data.forEach(element => {
                const isFile=element.includes('.');
            if(isFile){
                const dt = document.createElement('dt');
                    dt.textContent = element;
                    dt.onclick=(event)=>clickListener(dt,event);
                    elem.appendChild(dt);
            }
            else{
                const dd = document.createElement('dd');
                dd.textContent = element;
                dd.onclick=(event)=>clickListener(dd,event);
                elem.appendChild(dd)
            }
            });
            }
            else{
                const res=await fetch(url+path)
                const data = await res.json();
                editor.textContent='';
                data.length==0?editor.textContent='Empty File':
                editor.textContent=data;
            }
        } 
        catch (error) {
            window.alert(error);
        }
    }
    