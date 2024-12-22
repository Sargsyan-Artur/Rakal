import { AuthBaseController } from './auth.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TGetThinTokenParam,
    TTestType,
    TGetThinToken200Resp,
    TGetFatTokenByThinTokenParam,
    TGetFatTokenByThinToken200Resp,
    TUpdateSessionByUserIdParam,
    TUpdateSessionByUserId200Resp,
    TToken,
    ICredentials,
} from '../../../../types';
import { logStep } from '../../../../core/allure/step';
import { Response } from '../../../../core/got';
import { AUTH_JSON_SCHEMA_PATHS } from '../models/auth.swagger.paths';

export class AuthController extends AuthBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/api/v1',
        });
    }

    public getThinToken(params: IPositiveTest<TGetThinTokenParam>): Promise<Response<TGetThinToken200Resp>>;
    public getThinToken(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public getThinToken(params: TTestType<TGetThinTokenParam>): Promise<Response<TGetThinToken200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('POST')
                .url('/auth')
                .body(params.positive.body)
                .jsonSchemaJsonPath(AUTH_JSON_SCHEMA_PATHS.auth.auth)
                .send<TGetThinToken200Resp>();
        }
        return this.request().method('POST').url('/auth').body(params.negative.body).send<unknown>();
    }

    public getFatTokenByThinToken(params: IPositiveTest<TGetFatTokenByThinTokenParam>): Promise<Response<TGetFatTokenByThinToken200Resp>>;
    public getFatTokenByThinToken(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public getFatTokenByThinToken(
        params: TTestType<TGetFatTokenByThinTokenParam>,
    ): Promise<Response<TGetFatTokenByThinToken200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('POST')
                .url('/token/fat-token')
                .body(params.positive.body)
                .jsonSchemaJsonPath(AUTH_JSON_SCHEMA_PATHS.auth.fatToken)
                .send<TGetFatTokenByThinToken200Resp>();
        }
        return this.request().method('POST').url('/token/fat-token').body(params.negative.body).send<unknown>();
    }

    public updateSessionByUserId(params: IPositiveTest<TUpdateSessionByUserIdParam>): Promise<Response<TUpdateSessionByUserId200Resp>>;
    public updateSessionByUserId(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public updateSessionByUserId(
        params: TTestType<TUpdateSessionByUserIdParam>,
    ): Promise<Response<TUpdateSessionByUserId200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request().method('POST').url('/session/updating').body(params.positive.body).send<TUpdateSessionByUserId200Resp>();
        }
        return this.request().method('POST').url('/session/updating').body(params.negative.body).send<unknown>();
    }

    @logStep()
    public async getToken(credentials: ICredentials): Promise<TToken> {
        let thinToken: TGetThinToken200Resp['thinToken'];
        let fatToken: TGetFatTokenByThinToken200Resp['fatToken'];
        try {
            const thinTokenResponse = await this.getThinToken({
                positive: {
                    body: credentials,
                },
            });
            thinToken = thinTokenResponse.body.thinToken;
        } catch (error) {
            throw new Error(
                `[getThinToken] Can't get thinToken for user with next username: ${JSON.stringify(credentials.username)}.\nError: ${error}`,
            );
        }
        try {
            const fatTokenResponse = await this.getFatTokenByThinToken({
                positive: {
                    body: {
                        sessionId: thinToken!,
                    },
                },
            });
            fatToken = fatTokenResponse.body.fatToken!;
        } catch (error) {
            throw new Error(
                `[getFatTokenByThinToken] Can't get fatToken for user with next thinToken ${JSON.stringify(thinToken)}.\nError: ${error}`,
            );
        }
        return fatToken;
    }
}
