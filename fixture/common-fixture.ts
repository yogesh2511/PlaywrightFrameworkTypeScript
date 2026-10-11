import { test as baseTest } from '../fixture/pom-fixtures'
import {CommonUtils} from '../utils/common-utils'

type CommonFixtureType = {
commonUtils : CommonUtils

}

export const test = baseTest.extend<CommonFixtureType>({
commonUtils : async({},use)=>{
    use(new CommonUtils());
}})
