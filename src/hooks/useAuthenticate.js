import erestaurantApi from 'api/erestaurantApi';
import { selectorUser, setUser } from 'features/user/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthenticatedCookie } from 'utils/handleAuthenticatedCookie';

function useAuthenticate(type) {
	const [params, setParams] = useState();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// redux
	const dispatch = useDispatch();
	const user = useSelector(selectorUser);
	// router
	const navigate = useNavigate();

	// check authenticated user
	useEffect(() => {
		if (user.isAuthenticated) {
			navigate('/');
		}
	}, [user]);

	useEffect(() => {
		if (params) {
			(async () => {
				let response,
					hasData = false;
				setIsLoading(true);
				setErrorMessage('');
				try {
					switch (type) {
						case 'login':
							response = await erestaurantApi.loginWithEmail(params);
							hasData = true;
							break;
						case 'signup':
							response = await erestaurantApi.signupWithEmail(params);
							hasData = true;
							break;
						default:
							break;
					}
				} catch (err) {
					console.dir(err.response);
					setErrorMessage(
						err.response.data.message[0].messages[0].message ?? err
					);

					setIsLoading(false);
				}
				if (hasData) {
					// store user in redux
					dispatch(setUser(response.user));
					// store in session
					setAuthenticatedCookie(response.jwt);
				}
				setIsLoading(false);
			})();
		}
	}, [params]);

	return { isLoading, errorMessage, setErrorMessage, setParams };
}

export default useAuthenticate;
