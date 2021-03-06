var Login = {
    is_logged: false,
    is_signing_up: window.location.pathname === '/signup',
    onupdate: function () {
        var currentRoute = m.route.get();
        if (currentRoute !== '/') setTitle(Login.is_signing_up ? 'Sign Up' : 'Login');
    },
    view: function () {
        if (AuthUser.data._id) {
            m.route.set('/profile/' + AuthUser.data.username);
            return;
        }

        var currentRoute = m.route.get();

        function logUserIn(isSignUp, e) {
            e.preventDefault();
            var button = e.target.querySelector('input[type="submit"]');
            button.disabled = true;

            var data = {
                username: this.username.value,
                password: this.password.value
            };

            if (isSignUp) {
                var form = this;
                ['email', 'display_name', 'private', 'h-captcha-response', 'profile_pic'].forEach(function (key) {
                    if (form[key].type === 'checkbox') {
                        data[key] = form[key].checked;
                    } else {
                        data[key] = form[key].value;
                    }
                });
            }

            AuthUser[isSignUp ? 'signup' : 'login'](data, function (error) {
                button.disabled = false;
                if (error) {
                    nativeToast({
                        message: error,
                        position: 'north-east',
                        type: 'error'
                    });
                }
            });
        }

        var loginForm = m('div', [
            m('h2', { class: 'center-align' }, 'Login'),
            m('form', { class: 'flex one', onsubmit: function (e) { logUserIn.call(this, false, e); } }, [
                m('label', [
                    m('i', { class: 'icon-user-circle' }),
                    m('input', { type: 'text', placeholder: 'Username/Email', name: 'username', autocomplete: 'off', required: true })
                ]),
                m('label', [
                    m('i', { class: 'icon-key' }),
                    m('input', { type: 'password', placeholder: 'Password', name: 'password', autocomplete: 'off', required: true })
                ]),
                m('input', { class: 'full', type: 'submit', value: 'Login' })
            ]),
            m('h5', { class: 'center-align' }, [
                "Don't have an account? ",
                m('span', {
                    class: 'login-action', onclick: function () {
                        Login.is_signing_up = true;
                        if (currentRoute !== '/') m.route.set('/signup');
                    }
                }, 'Sign Up')
            ])
        ]);

        var signUpForm = m('div', [
            m('h2', { class: 'center-align' }, 'Sign Up'),
            m('h5', { class: 'center-align' }, [
                "Already have an account? ",
                m('span', {
                    class: 'login-action', onclick: function () {
                        Login.is_signing_up = false;
                        if (currentRoute !== '/') m.route.set('/login');
                    }
                }, 'Login')
            ]),
            m('form', { class: 'flex one', onsubmit: function (e) { logUserIn.call(this, true, e); } }, [
                m('label', [
                    m('i', { class: 'icon-user-circle' }),
                    m('input', { type: 'text', placeholder: 'Username', name: 'username', autocomplete: 'off', required: true })
                ]),
                m('span', '* Username cannot contain special characters and needs to be a minimum of 2 characters'),
                m('label', [
                    m('i', { class: 'icon-key' }),
                    m('input', { type: 'password', placeholder: 'Password', name: 'password', autocomplete: 'off', required: true })
                ]),
                m('span', '* Password needs to be a minimum of 6 characters'),
                m('label', [
                    m('i', { class: 'icon-mail-alt' }),
                    m('input', { type: 'email', placeholder: 'Email (Optional)', name: 'email', autocomplete: 'off' })
                ]),
                m('label', [
                    m('i', { class: 'icon-desktop' }),
                    m('input', { type: 'text', placeholder: 'Display Name (Optional)', name: 'display_name', autocomplete: 'off' })
                ]),
                m('label', [
                    m('i', { class: 'icon-lock' }),
                    m('input', { type: 'checkbox', name: 'private' }),
                    m('div', { class: 'checkable' }, 'Make Profile Private')
                ]),
                m('div', [
                    m('label', [
                        m('i', { class: 'icon-picture' }),
                        m('span', 'Upload Profile Picture:')
                    ]),
                    m('label', { class: 'dropimage', style: Login.uploaded_profile_pic ? convertObjToStyles({ backgroundImage: 'url(' + Login.uploaded_profile_pic + ')' }) : undefined }, [
                        m('input', { class: 'none', name: 'profile_pic', value: Login.uploaded_profile_pic }),
                        m('input', { type: 'file', accept: 'image/*', title: 'Drag & Drop image or click here', onchange: function(e) { uploadImg(e, { object: Login, key: 'uploaded_profile_pic' }) } }),
                        m('div', m('i', { class: 'icon-camera none' })),
                        m('div', 'Upload')
                    ])
                ]),
                m('div', { class: 'h-captcha center-align', 'data-sitekey': hcaptchaKey, oncreate: loadCaptchaScript }),
                m('input', { class: 'full', type: 'submit', value: 'Sign Up' })
            ])
        ]);

        return m('div', { class: 'login-form' }, Login.is_signing_up || currentRoute === '/signup' ? signUpForm : loginForm);
    }
};