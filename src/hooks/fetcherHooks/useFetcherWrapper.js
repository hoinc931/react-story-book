
export { useFetchWrapper };

function useFetchWrapper() {
  // Lưu ý sử dụng redux, recoil hoặc là context provider để lưu state authentication và authorization
  const [auth, setAuth] = {
    accessToken: '',
    refreshToken: ''
  };
  const [user, setUser] = 'User information';

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    patch: request("PATCH"),
  };

  function request(method) {
    return (url, body) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then((res) =>
        handleResponse(res, requestOptions)
      );
    };
  }

  function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    if (auth?.accessToken) {
      return { Authorization: `Bearer ${auth?.accessToken}` };
    } else {
      return {};
    }
  }

  function handleResponse(response, requestOptions) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if (response.status === 401 && auth?.accessToken) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          // ==> Xử lý đăng xuất/ xóa dữ liệu đã hết hạn khi bị 401 hoặc 403 nhưng có token (token b)
          setUser(null);
          setAuth(null);
        }

        // xử lý refresh token khi bị hết hạn và gọi lại api bị failed
        if (response.status === 401 && user && auth.refreshToken) {
          const condition = {
            username: user.username,
            refreshToken: auth.refreshToken,
          };

          // refresh token
          return Promise.resolve(
            fetch('url_refresh_token', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(condition),
            })
              .then((res) => res.json())
              .then((res) => {
                // nếu refresh thành công thì lưu lại token và tiếp tục gọi lại api bị failed còn không thì reject và trả lỗi
                localStorage.setItem("auth", JSON.stringify(res));
                setAuth(res);
                return fetch(response.url, requestOptions)
                  .then((res) => res.json())
                  .then((res) => res)
                  .catch((err) => err);
              })
              .catch((err) => err)
          );
        }

        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }

      return data;
    });
  }
}