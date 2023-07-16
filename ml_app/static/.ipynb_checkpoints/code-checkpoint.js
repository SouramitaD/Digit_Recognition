//console.log("hello world");
//let v=0
//for(let i=0;i<10;i++){
//    v++
//}
//console.log("updated value of v ",v);

const e = React.createElement; //function


function center(element) { //anything can be passed as argument
    return e('div', { style: { textAlign: "center" } }, element)
}

const root = ReactDOM.createRoot(document.getElementById('my_app'));

const palette = e('label', null, 'COLOR ', e('input', { type: "color", onChange: set_color }));

function set_color(event) {
    //console.log('color changed',event.target.value);
    canvas_instance = document.getElementById('canvas').getContext('2d');
    canvas_instance.fillStyle = event.target.value;
    canvas_instance.strokeStyle = event.target.value;
    ///canvas_instance.style.background=event.target.value;
    //console.log(cabvas_instabce);
}
//function color_open(event){
//    console.log('color opened');
//}
const brush_width = e('label', null, ' BRUSH-WIDTH ',
    e('input', { type: "range", min: "20", max: "40", onChange: set_brush_size }));



function set_brush_size(event) {
    canv_inst = document.getElementById('canvas').getContext('2d');
    canv_inst.lineWidth = event.target.value;

    //console.log('brush size changed',event.target.value)
}




function canvas() {
    const canvas_obj = e('canvas', {
        id: "canvas",
        width: "500",
        height: "500",
        onMouseMove: canvas_draw,
        onDoubleClick: toggle_draw,
        onTouchStart:toggle_draw,

        style: {
            background: "black",
            border: "10px solid green",
        }
    });
    return canvas_obj;
}

let draw_mode = 0;

const display = e('label', {
        id: 'text',
        style: {
            color: 'black',
            fontSize: '50px'
        }
    },
    'Drawing OFF');

const clear = e('label', null, e('input', { type: "button", value: " CLEAR", onClick: clear_canvas }));

function toggle_draw(event) {
    let canv_inst = document.getElementById('canvas').getContext('2d');
    draw_mode = 1 - draw_mode;
    let draw_label = document.getElementById('text');
    if (draw_mode == 1) {
        canv_inst.beginPath();
        canv_inst.lineCap = 'round';
         canv_inst.lineJoin = 'round';
        draw_label.textContent = 'Drawing ON';
    } else {
        draw_label.textContent = 'Drawing OFF';
        canv_inst.closePath();

    }
    //console.log(draw_mode);
}

function canvas_draw(event) {
    //console.log(event);
    //console.log('moving',event.nativeEvent.screenX,event.nativeEvent.screenY);
    //onChange:set_color();
    canv_inst = event.target.getContext("2d");
    if (draw_mode) {
        //ctx.fillText("Souramita",event.nativeEvent.offsetX,event.nativeEvent.offsetY);
        //console.log(event.nativeEvent.screenX,event.nativeEvent.screenY);
        canv_inst.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        canv_inst.stroke();
    }
}

function clear_canvas(event) {
    //canvas_instance=document.getElementById('canvas')
    //context=canvas_instance.getContext('2d');
    //context.clearRect(0, 0, canvas_instance.width, canvas_instance.height);
    canv_inst = document.getElementById('canvas').getContext('2d');
    canv_inst.clearRect(0, 0, 500, 500);
    canv_inst.closePath();
    draw_mode = 0;
    let draw_label = document.getElementById('text');
    draw_label.textContent = "Drawing mode Off";
    //console.log(context);
}

const send = e('button', {
    id: 'send',
    onClick: send_to,
    style: {
        color: 'black',
        fontsize: '30px',
    }
}, 'SEND');

function send_to(event) {
    canv_inst = document.getElementById('canvas').getContext('2d');
    h = canv_inst.getImageData(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);
    console.log(h);
}

//const toolbar=e('div',null,pallete,brush_width);
const toolbar = e('div', {
        style: {
            font_family: "lobster,cursive",
            textAlign: "Center",
            backgroundColor: "#A7AFEC",
            border: "4px solid red",
            width: "500px",
            margin: "auto",
            wordSpacing: "8px",

        }
    },
    palette,
    brush_width,
    clear,
    display);
//root.render(toolbar);
// const send_data = e('form', { id: 'send_data', role: 'form', method: "POST", action: "/" },
//     e('input', { type: 'hidden', name: 'image' }),
//     e('input', { type: 'submit', onClick: send_to_server }));
const send_data=e('button',{id:'send_data',onClick:send_to_server},'PREDICT');
const output=e('font',{id:'output',size:"50",color:"red"},'The Digit is 0');
function send_to_server(event) {
    //event.preventDefault();
    canv_inst = document.getElementById('canvas').getContext('2d');
    h = canv_inst.getImageData(0, 0, 500, 500, { colorSpace: 'srgb' }).data;
    send_inst = document.getElementById('output');
    console.log('data sent');
    //sending data using AJAX
    fetch('https://bd90-3-23-158-214.ngrok.io/predict',{
        method:'POST',
        body:h,
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
        
       //console.log(data);
        send_inst.textContent='The digit is ' + data.digit;
        
    });
    
    //console.log(canv_inst);


}

//ES6 class
class PaintCanvas extends React.Component {
    render() {
        return e(
            'div', 'null',
            toolbar,
            center(canvas()),
            center(send_data),
            center(output)
        );
    }
}
root.render(e(PaintCanvas));
//console.log(canvas(palette));