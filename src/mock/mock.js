import Mock from 'mockjs';

const Random = Mock.Random;

const Result = {
    code: 200,
    msg: '操作成功',
    data: null,
};

// 模拟验证码接口
Mock.mock('/captcha', 'get', () => {
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('120x40', 'p7n5w'), // 生成一个验证码图片
    };
    return Result;
});

// 模拟登录接口
Mock.mock('/login', 'post', (options) => {
    const body = JSON.parse(options.body);
    const correctCode = '1234'; // 假设这是正确的验证码

    if (body.code === correctCode) {
        Result.code = 200;
        Result.msg = '登录成功';
        Result.data = { token: Random.string(32) }; // 返回一个有效的 token
    } else {
        Result.code = 400;
        Result.msg = '验证码错误';
    }
    return Result;
});
