import React, { useState } from 'react';

import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { app } from '../firebase' ;

const db = getFirestore(app);

function Contacto () {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [pais, setpais] = useState("Canadá");
    const [asunto, setasunto] = useState("");
    const [mensaje, setmensaje] = useState("");
    const [done, setdone] = useState(false);

    const saveEmail = async () => {

        if (validar()) {

            const htmlFull = `
            <div style="font-family: Arial, Helvetica, sans-serif; border-radius: 5px; padding: 10px 20px; box-sizing: border-box; max-width: 700px; background-color: #F9F9F9; margin: 30px auto;">
                <div style="text-align: center;">
                    <img src="https://rjmcentroamerica.org/wp-content/uploads/2019/11/cropped-cropped-cropped-cropped-logotipo2-1.png" alt="RJM">
                    <hr>
                </div>
                <p style="font-weight: 600;">Nombre:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${name}</p>
                <p style="font-weight: 600;">Correo:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${email}</p>
                <p style="font-weight: 600;">Asunto:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${asunto}</p>
                <p style="font-weight: 600;">Pais:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${pais}</p>
                <p style="font-weight: 600;">Mensaje:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${mensaje}</p>
                <hr>
                <p style="margin: 30px; text-align: center; font-size: 14px; color: grey;">Correo enviado desde el servidor general de mensajes diseñado por <strong>José Galdámez</strong>. Si tiene algún problema de visualización puede comunicarse a el correo <a href="mailto:josegaldamez1991@gmail.com">josegaldamez1991@gmail.com</a> </p>
            </div>
            `

            

            const emailCol = collection(db, 'email');

            
            // Mensaje dirigido al referente
            const messageGeneral = {
                to: referente(pais),
                message: {
                  subject: asunto,
                  text: name,
                  html: htmlFull,
                }
            }

            await addDoc(emailCol, messageGeneral).then(respuesta => {
                console.log(respuesta);
            }).catch(error => {
                console.log(error);
            });

            // Mensaje que se envia de forma general siempre
            const message = {
                to: "atencion.regional@rjmcentroamerica.org",
                message: {
                  subject: asunto,
                  text: name,
                  html: htmlFull,
                }
            }

            await addDoc(emailCol, message).then(respuesta => {
                console.log(respuesta);
            }).catch(error => {
                console.log(error);
            });



            alert("Mensaje enviado");
            setname("");
            setemail("");
            setmensaje("");
            setasunto("");
            setpais("Canadá");

            setdone(true);
            
        } else {
            console.log("show error");
        }

    }

    const validar = () => {
        let validacion = true;

        if (name === "" || pais === "" || asunto === "" || mensaje === "") {
            validacion = false;
        }

        return validacion;
    }

    const referente = (country) => {

        let referente ="josegaldamez1991@gmail.com";


        // Correo para Canada
        if (country === "Canadá") {
            referente = "npiche@jesuites.org";
        }

        // USA - Miami
        if (country === "Estados Unidos (Miami)") {
            referente = "silviam46@gmail.com";
        }
        if (country === "USA") {
            referente = "jornelas@kinoborderinitiative.org";
        }


        // México
        if (country === "México (Ciudad de México, centro y norte del país)") {
            referente = "coordinacion.centro@sjmmexico.org";
        }
        if (country === "México (Chiapas, Tapachula)") {
            referente = "jehry.perez@jrs.net";
        }
        if (country === "México (Chiapas, Comalapa y sur del país)") {
            referente = "acompanamiento.sanrafael@sjmmexico.org";
        }


        // Centroamerica
        if (country === "Guatemala") {
            referente = "angel.esc.gt@gmail.com";
        }
        if (country === "Honduras") {
            //referente = "iolanyradio@gmail.com";
            referente = "keylacanales@eric-sj.org";
        }
        if (country === "El Salvador") {
            referente = "gferrer@uca.edu.sv";
        }
        if (country === "Nicaragua") {
            referente = "atencionlegalsjm@uca.edu.ni";
        }
        if (country === "Costa Rica") {
            referente = "j.soto@serviciojesuitacr.org";
        }
        if (country === "Panamá") {
            referente = "pa.serviciomigrantes@feyalegria.org";
        }
        
        //Europa
        if (country === "España") {
            referente = "juridico@sjme.org";
        }
        
        // Otros países
        if (country === "Otros países") {
            referente = "atencion.regional@rjmcentroamerica.org";
        }
        

        return referente;
    }

    const handleName = (event) => {
        setname(event.target.value);
    }
    const handleEmail = (event) => {
        setemail(event.target.value);
    }
    const handlePais = (event) => {
        setpais(event.target.value);
    }
    const handleAsunto = (event) => {
        setasunto(event.target.value);
    }
    const handleMensaje = (event) => {
        setmensaje(event.target.value);
    }

    const clearForm = () => {

            
            setname("");
            setemail("");
            setmensaje("");
            setasunto("");
            setpais("Canadá");

            setdone(false);
    }








    // HTML visible

    if (done) {
        return (
            <div className="container">
                <div className="image-logo">
                    <img src="https://rjmcentroamerica.org/wp-content/uploads/2019/11/cropped-cropped-cropped-cropped-logotipo2-1.png" alt="RJM Centroamerica" />
                </div>
                <hr/>
            <div className="container done">
                <div className="alert alert-success" role="alert">
                <strong>El mensaje ha sido enviado. </strong> Dentro de poco alguien se pondrá en contacto con usted.
                </div>
                <button onClick={clearForm} className="btn btn-success">
                    Enviar otro mensaje
                </button>
            </div>
            </div>
        );
    } else {

    return(
        <div className="container">
            <div className="image-logo">
                <img src="https://rjmcentroamerica.org/wp-content/uploads/2019/11/cropped-cropped-cropped-cropped-logotipo2-1.png" alt="RJM Centroamerica" />
            </div>
            <br/>
                <hr/>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Escriba su nombre:</label>
                <input type="text" value={name} onChange={handleName} className="form-control" id="nombre" placeholder="Nombre..." />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Su correo electrónico:</label>
                <input type="email" value={email} onChange={handleEmail} className="form-control" id="email" placeholder="nombre@ejemplo.com" />
            </div>
            <div className="mb-3">
                <label htmlFor="pais" className="form-label">En qué país se encuentra:</label>
                <select className="form-select" value={pais} onChange={handlePais} aria-label="Default select example" id="pais">
                    <option value="Canadá" defaultValue>Canadá</option>
                    <option value="Estados Unidos (Miami)" >Estados Unidos (Miami) </option>
                    <option value="USA" >Estados Unidos (Excepto Miami)</option>
                    <option value="México (Ciudad de México, centro y norte del país)">México (Ciudad de México, centro y norte del país) </option>
                    <option value="México (Chiapas, Tapachula)">México (Chiapas, Tapachula)</option>
                    <option value="México (Chiapas, Comalapa y sur del país)">México (Chiapas, Comalapa y sur del país)</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Panamá">Panamá</option>
                    <option value="España">España</option>
                    <option value="Otros países">Otros países</option>
                </select>
            </div>
           
            <div className="mb-3">
                <label htmlFor="asunto" className="form-label">Motivo del correo:</label>
                <input type="text" value={asunto} onChange={handleAsunto} className="form-control" id="asunto" placeholder="Escribo porque..." />
            </div>

            <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">Cuerpo del mensaje:</label>
                <textarea value={mensaje} placeholder="Aqui el mensaje..." onChange={handleMensaje} className="form-control" id="mensaje" rows="3">
                    
                </textarea>
            </div>


            <button className="btn btn-primary" onClick={saveEmail} >Enviar correo</button>
            <br/>
            
        </div>
    );
}
}

export default Contacto;