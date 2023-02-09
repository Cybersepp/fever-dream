import './style.css'
import * as THREE from 'three';
import '/null.mp3'

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
let CAMERA_POS_Z = 100;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(CAMERA_POS_Z);
camera.position.setY(20);
camera.position.setX(-20);

const geometry = new THREE.TorusGeometry(30,10,16,50);
const material = new THREE.MeshBasicMaterial({color: 0x39ff14, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

let audioUrl = require('/null*.mp3');
var audio = new Audio(audioUrl);
audio.play();

function animate(starArr) {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function addStar() {
    const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({color: 0x39ff14})
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    star.position.set(x, y, z)
    scene.add(star)
}

let starArr = Array(150).fill()
starArr.forEach(addStar);
// Credit to https://codepen.io/tjezidzic/pen/LLWoLw
var data = [
    {
        AboutDevTypeText: "<span><br/>Let an ultraintelligent machine be defined as a machine that can far surpass all the\n" +
            "intellectual activities of any man however clever.</span><br/><br/><span>Since the design of machines is one\n" +
            "of these intellectual activities, an ultraintelligent machine could design even better\n" +
            "machines; </br> </br> there would then unquestionably be an “intelligence explosion”, and the\n" +
            "intelligence of man would be left far behind.<br/></br>Thus the first ultraintelligent machine is\n" +
            "the last invention that man need ever make.</span><br/></br></br>Do you wish to proceed..(Y / N)?  </br>"
    }
];

var allElements = document.getElementsByClassName("typeing");
for (var j = 0; j < allElements.length; j++) {
    var currentElementId = allElements[j].id;
    var currentElementIdContent = data[0][currentElementId];
    var element = document.getElementById(currentElementId);
    var devTypeText = currentElementIdContent;

    // type code
    var i = 0, isTag, text;
    (function type() {
        text = devTypeText.slice(0, ++i);
        if (text === devTypeText) return;
        element.innerHTML = text + `<span class='blinker'>&#32;</span>`;
        var char = text.slice(-1);
        if (char === "<") isTag = true;
        if (char === ">") isTag = false;
        if (isTag) return type();
        setTimeout(type, 60);
    })();
}

document.body.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "Y" || event.key === "y") {
        window.location.replace("https://consc.net/papers/singularity.pdf");
    } else if (event.key === "N" || event.key === "n") {
        window.location.replace("https://sevenius-nilsen.medium.com/the-case-against-the-singularity-f5c79f17417e");
    }
});

animate(starArr);
