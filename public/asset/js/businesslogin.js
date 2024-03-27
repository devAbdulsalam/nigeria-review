const apiurl = 'http://localhost:8080/api/v1/users';
//process the login and the register
document.querySelector('#regBtn').addEventListener('click', doReg);
document.querySelector('#loginBtn').addEventListener('click', doLogin);

function doReg(ev) {
	ev.preventDefault();
	console.log('Send a Register request');
	let firstName = document.querySelector('.signup-form #firstName').value;
	let lastName = document.querySelector('.signup-form #lastName').value;
	let em = document.querySelector('.signup-form #mail-email').value;
	let pass = document.querySelector('.signup-form #password').value;
	let confirmPass = document.querySelector('.signup-form #confirm').value;
	//TODO: Add form validation
	if (confirmPass !== pass) {
		return alert('password must match');
	}
	let user = { firstName, lastName, email: em, password: pass };
	let endpoint = 'register';
	sendData(user, endpoint, registerSuccess);
}

function doLogin(ev) {
	ev.preventDefault();
	let em = document.querySelector('.login-form #username').value;
	let pass = document.querySelector('.login-form #password').value;
	//TODO: Add form validation
	let user = { email: em, password: pass };
	let endpoint = 'login';
	sendData(user, endpoint, loginSuccess);
}

function sendData(user, endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let h = new Headers();
	h.append('Content-Type', 'application/json');
	let req = new Request(url, {
		method: 'POST',
		headers: h,
		body: JSON.stringify(user),
	});
	fetch(req)
		.then((res) => res.json())
		.then((content) => {
			//we have a response
			if ('error' in content) {
				//bad attempt
				failure(content.error);
			}
			if ('data' in content) {
				//it worked
				callback(content.data);
			}
		})
		.catch(failure);
}

function loginSuccess(data) {
	//we have a token so put it in localstorage
	console.log('token', data.token);
	sessionStorage.setItem('myapp-token', data.token);
	alert('You are logged in');
}

function registerSuccess(data) {
	//user has been registered
	console.log('new user created', data);
	alert('You have been registered');
}

function failure(err) {
	alert(err.message);
	console.warn(err.code, err.message);
}
