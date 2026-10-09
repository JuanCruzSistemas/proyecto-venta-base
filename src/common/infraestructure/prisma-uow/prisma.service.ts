import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        const connectionString = `postgresql://${configService.get<string>("POSTGRES_USER")}:` +
                                 `${configService.get<string>("POSTGRES_PASSWORD")}@` +
                                 `${configService.get<string>("HOST")}:` +
                                 `${configService.get<string>("POSTGRES_PORT")}/` +
                                 `${configService.get<string>("POSTGRES_DB")}`;

        const adapter = new PrismaPg({ connectionString });

        super({ adapter });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}
