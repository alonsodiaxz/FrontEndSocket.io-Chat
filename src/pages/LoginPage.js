import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2'

export const LoginPage = () => {

	const {login} = useContext(AuthContext)

	const [form, setform] = useState({
		email:'',
		password: '',
		rememberme: false
	});

	//Se carga automáticamente en el cliente, recogiendo el valor almacenado en el localstorage.
	useEffect(() => {
		const remembermeEmail = localStorage.getItem('email');
		if(remembermeEmail){
			setform( (form) => ({
				...form,
				rememberme: true,
				email: remembermeEmail
			}))
		}
		
	}, [])

	const onChange = ({target}) => { /*Cada vez que se llama a este método, los cambios efectuados se almacenan en target, de donde
		sacamos las variables name y value, que son las que pueden cambiar*/
		const {name, value} = target;
		setform({
			...form, /*Exparcir los valores actuales del form, ya que solo vamos a cambiar el name y el value */
			[name]:value /*Usar el valor del name y no crear una propiedad name en el objeto*/
		})
	}

	//Método para se cargue el tick del remememberme
	const  toggleCheck = () => {
		setform({
			...form,
			rememberme:!form.rememberme
		})
	}

	const onSubmit = async(ev) => {
		ev.preventDefault();

		//Guardar en el espacio local
		(form.rememberme)
		?localStorage.setItem('email',form.email) //Guardar en el equipo local 
		:localStorage.removeItem('email')

		//Para parametros al login para hacer peticion http
		const {email,password} = form; //Al tenerlo directamente entre llaves, extrae las variables del form.
		const ok = await login(email,password);
		//En caso de que los campos esten mal salta un mensaje de error de la libreria sweetalert2
		if(ok !== true){
			Swal.fire('Error', ok, 'error');
		}

		
	}

	//Comprobar que los campos están rellenos para deshabilitar el botón de ingresar
	const todoOk = () => {
		return (form.email.length > 0 && form.password.length> 0) 
		?true 
		:false
	}

    return (
        <form className="login100-form validate-form flex-sb flex-w"
		onSubmit={onSubmit}> {/*Metodo que se llama al pulsar el boton de submit*/}
					<span className="login100-form-title mb-3"> 
						Chat - Ingreso
					</span>
					
					<div className="wrap-input100 validate-input mb-3">
						<input 
						className="input100" 
						type="email" 
						name="email" 
						placeholder="Email" 
						value={form.email}
						onChange={onChange}/>
						<span className="focus-input100"></span>
					</div>
					
					
					<div className="wrap-input100 validate-input mb-3">
						<input 
						className="input100" 
						type="password" 
						name="password" 
						placeholder="Password" 
						value={form.password}
						onChange={onChange}/>
						<span className="focus-input100"></span>
					</div>
					
					<div className="row mb-3">
						<div 
						className="col"
						onClick={() => toggleCheck()}>
							<input 
							className="input-checkbox100" 
							id="ckb1" 
							type="checkbox" 
							name="rememberme"
							checked={form.rememberme}
							readOnly/>
							<label className="label-checkbox100">
								Recordarme
							</label>
						</div>

						<div className="col text-right">
                             <Link to="/auth/register" className="txt1">
								Nueva cuenta?
							</Link>
						</div>
					</div>

					<div className="container-login100-form-btn m-t-17">
						<button 
						type ="submit"
						className="login100-form-btn"
						disabled={!todoOk()}>
							Ingresar
						</button>
					</div>
				</form>
    )
}
