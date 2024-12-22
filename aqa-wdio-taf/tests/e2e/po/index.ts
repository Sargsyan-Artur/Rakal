import { initPo } from '../../../src/core/po';
import { basePage } from './pages/base.page';
import { iFrame } from './pages/iframe.page';
import { demoFrame } from './pages/demo-frame.page';
import { bootstrapBasePage } from './bootstrap/pages/bootstrap.base.page';

initPo({
    [basePage.name]: basePage,
    [iFrame.name]: iFrame,
    [demoFrame.name]: demoFrame,
    [bootstrapBasePage.name]: bootstrapBasePage,
});
