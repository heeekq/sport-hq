import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TesterService } from './tester.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/authorization/roles.decorator';
import { ERole } from 'src/shared/enums/role.enum';
import { ExecuteTesterBodyDto, ExecuteTesterParamDto, ExecuteTesterQueryDto, TesterDto } from './dto/testers.dto';
import { Request } from 'express';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";

@ApiTags('tester')
@Controller('tester')
export class TesterController {
    constructor(private testerService: TesterService) {}

    @ApiOperation({ summary: 'Get Testers' })
    @ApiResponse({ status: 200, description: 'Return Testers' })
    @ApiResponse({ status: 404, description: 'Can not Testers' })
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles([ERole.Admin, ERole.Customer])
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @HttpCode(HttpStatus.OK)
    getProducts() {
        return this.testerService.getTester();
    }

    @ApiOperation({ summary: 'Create' })
    @ApiResponse({ status: 200, description: 'Return ...' })
    @ApiResponse({ status: 404, description: 'Can not ...' })
    @ApiBearerAuth()
    @Post('add')
    @UseGuards(JwtAuthGuard)
    @Roles([ERole.Admin, ERole.Customer])
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @HttpCode(HttpStatus.OK)
    createTester(@Body() body: TesterDto, @Param() param: any, @Query() query: any, @Req() req: IRequestExt) {
        console.log('query=', query);
        console.log('param=', param);
        console.log('body=', body);
        console.log('req=', req.user);
        return this.testerService.createTester(param, query, body, req);
    }

    @ApiOperation({ summary: 'Execute tester' })
    @ApiResponse({ status: 200, description: 'Return tester.' })
    @ApiResponse({ status: 404, description: 'Can not Execute.' })
    @ApiBearerAuth()
    @Patch('execute/:testerId/:qwe?')
    @UseGuards(JwtAuthGuard)
    @Roles([ERole.Admin, ERole.Customer])
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @HttpCode(HttpStatus.OK)
    executeTester(
        @Body() body: ExecuteTesterBodyDto,
        @Param() param: ExecuteTesterParamDto,
        @Query() query: ExecuteTesterQueryDto,
        @Req() req: IRequestExt,
    ) {
        console.log('query=', query);
        console.log('param= ', param);
        console.log('body=', body);
        console.log('req.user=', req.user);
        return { query, param, body };
        // return this.testerService.executeTester(param, query, body, req);
    }

    @ApiOperation({ summary: 'Simple test endpoint' })
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'Error' })
    // @ApiBearerAuth()
    @Get('simple-test')
    // @UseGuards(JwtAuthGuard)
    // @Roles([ERole.Admin, ERole.Customer])
    // @UsePipes(new ValidationPipe({ whitelist: true }))
    @HttpCode(HttpStatus.OK)
    simpleTest() {
        return 'Success!';
    }
}
