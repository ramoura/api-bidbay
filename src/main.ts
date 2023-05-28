import CreateUser from "./application/usecase/user/CreateUser";
import RetrieveUser from "./application/usecase/user/RetrieveUser";
import UpdateUser from "./application/usecase/user/UpdateUser";
import PostUserController from "./infra/http/api/user/PostUserController";
import GetUserController from "./infra/http/api/user/GetUserController";
import PutUserController from "./infra/http/api/user/PutUserController";
import GetDealController from "./infra/http/api/deal/GetDealController";
import RetrieveDeal from "./application/usecase/deal/RetrieveDeal";
import PostDealController from "./infra/http/api/deal/PostDealController";
import CreateDeal from "./application/usecase/deal/CreateDeal";
import PutDealController from "./infra/http/api/deal/PutDealController";
import UpdateDeal from "./application/usecase/deal/UpdateDeal";
import GetBidController from "./infra/http/api/bid/GetBidController";
import RetrieveBid from "./application/usecase/bid/RetrieveBid";
import PostBidController from "./infra/http/api/bid/PostBidController";
import PutBidController from "./infra/http/api/bid/PutBidController";
import CreateBid from "./application/usecase/bid/CreateBid";
import UpdateBid from "./application/usecase/bid/UpdateBid";
import GetBidsController from "./infra/http/api/bid/GetBidsController";
import RetrieveBids from "./application/usecase/bid/RetrieveBids";
import CreateMessage from "./application/usecase/message/CreateMessage";
import PostDeliveryController from "./infra/http/api/delivery/PostDeliveryController";
import GetMessageController from "./infra/http/api/message/GetMessageController";
import PostMessageController from "./infra/http/api/message/PostMessageController";
import PutMessageController from "./infra/http/api/message/PutMessageController";
import UpdateMessage from "./application/usecase/message/UpdateMessage";
import RetrieveMessage from "./application/usecase/message/RetrieveMessage";
import RetrieveDelivery from "./application/usecase/delivery/RetrieveDelivery";
import GetDeliveryController from "./infra/http/api/delivery/GetDeliveryController";
import CreateDelivery from "./application/usecase/delivery/CreateDelivery";
import GetInviteController from "./infra/http/api/invite/GetInviteController";
import CreateInvite from "./application/usecase/invite/CreateInvite";
import UpdateInvite from "./application/usecase/invite/UdateInvite";
import PostInviteController from "./infra/http/api/invite/PostInviteController";
import PutInviteController from "./infra/http/api/invite/PutInviteController";
import RetrieveInvite from "./application/usecase/invite/RetrieveInvite";
import GetInvitesController from "./infra/http/api/invite/GetInvitesController";
import RetrieveInvites from "./application/usecase/invite/RetrieveInvites";
import AuthenticateController from "./infra/http/api/authenticate/AuthenticateController";
import AuthenticateUser from "./application/usecase/auth/AuthenticateUser";
import AuthenticateSSOController from "./infra/http/api/authenticate/AuthenticateSSOController";
import AuthenticateSSO from "./application/usecase/auth/AuthenticateSSO";
import SSOProviderGateway from "./application/gateway/SSOProviderGateway";
import UserRepositoryDatabase from "./infra/repository/database/UserRepositoryDatabase";
import DealRepositoryDatabase from "./infra/repository/database/DealRepositoryDatabase";
import AuthorizationMiddleware from "./infra/http/api/AuthorizationMiddleware";
import TokenGenerate from "./domain/service/TokenGenerate";
import DealRepository from "./application/repository/DealRepository";
import FunctionsGoogleCloudAdapter from "./infra/http/FunctionsGoogleCloudAdapter";
import dotenv from "dotenv";

const httpServer = new FunctionsGoogleCloudAdapter()

let topLevelIIFE = (async () => {

    dotenv.config();

    const userRepository = new UserRepositoryDatabase();
    const dealRepository: DealRepository = new DealRepositoryDatabase()


    const createUser = new CreateUser(userRepository)
    const retrieveUser = new RetrieveUser(userRepository);

    const tokenGenerator = new TokenGenerate('secret')

    const authorizationMiddleware = new AuthorizationMiddleware(tokenGenerator)

    new GetUserController(httpServer, retrieveUser, authorizationMiddleware)
    new PostUserController(httpServer, createUser)
    new PutUserController(httpServer, new UpdateUser(userRepository), authorizationMiddleware)

    new GetDealController(httpServer, new RetrieveDeal(dealRepository), authorizationMiddleware)
    new PostDealController(httpServer, new CreateDeal(dealRepository), authorizationMiddleware)
    new PutDealController(httpServer, new UpdateDeal(dealRepository), authorizationMiddleware)

    new GetBidController(httpServer, new RetrieveBid(dealRepository))
    new GetBidsController(httpServer, new RetrieveBids(dealRepository))
    new PostBidController(httpServer, new CreateBid(dealRepository), authorizationMiddleware)
    new PutBidController(httpServer, new UpdateBid(dealRepository), authorizationMiddleware)

    new GetMessageController(httpServer, new RetrieveMessage(dealRepository))
    new PostMessageController(httpServer, new CreateMessage(userRepository, dealRepository), authorizationMiddleware)
    new PutMessageController(httpServer, new UpdateMessage(dealRepository), authorizationMiddleware)

    new GetDeliveryController(httpServer, new RetrieveDelivery(dealRepository))
    new PostDeliveryController(httpServer, new CreateDelivery(dealRepository), authorizationMiddleware)

    new GetInviteController(httpServer, new RetrieveInvite(userRepository), authorizationMiddleware)
    new GetInvitesController(httpServer, new RetrieveInvites(userRepository), authorizationMiddleware)
    new PostInviteController(httpServer, new CreateInvite(userRepository), authorizationMiddleware)
    new PutInviteController(httpServer, new UpdateInvite(userRepository), authorizationMiddleware)

    new AuthenticateController(httpServer, new AuthenticateUser(userRepository, tokenGenerator))

    const ssoProvider: SSOProviderGateway = {
        authenticate: (token: string) => {
            return undefined as any;
        }
    } as SSOProviderGateway

    new AuthenticateSSOController(httpServer, new AuthenticateSSO(ssoProvider, userRepository))
    httpServer.listen(3001)


})()

export const api = httpServer.app;