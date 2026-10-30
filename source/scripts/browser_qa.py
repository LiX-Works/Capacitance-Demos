"""Verify real collection URLs, every page of both demos and the key interactions (2026-10-23 English edition)."""
from pathlib import Path
import json, re, sys
from playwright.sync_api import sync_playwright
from browser_support import ROOT,NAMES,read_json,write_json,sha,launch,server

report={'method':'Real Chromium isolated profile, HTTP project subpath and offline file navigation',
        'rendererScope':'SwiftShader functional checks, no hardware FPS claim',
        'checks':[],'errors':[],'externalRequests':[],'projects':{}}
artifacts=ROOT/'qa/browser-artifacts';artifacts.mkdir(parents=True,exist_ok=True)
CJK=re.compile(r'[一-鿿]')
def check(name,ok,detail=None):
    report['checks'].append({'name':name,'passed':bool(ok),'detail':detail})
    if not ok:print('FAIL',name,flush=True)
    return bool(ok)
def ev(page,api,expression,arg=None):
    return page.evaluate(expression.replace('API',api),arg)
def attach(page):
    page.on('pageerror',lambda error:report['errors'].append(str(error)))
    page.on('request',lambda req:report['externalRequests'].append(req.url) if url_external(req.url) else None)
def url_external(url):return not url.startswith(('http://127.0.0.1:','file:','data:','about:'))

with sync_playwright() as pw, server() as base:
    browser=launch(pw)
    report['browserVersion']=browser.version
    try:
        page=browser.new_page(viewport={'width':1280,'height':900});attach(page)
        response=page.goto(base,wait_until='networkidle');check('Collection entrance loads by HTTP',response.status==200)
        check('Both demo entries visible',page.get_by_role('link',name='Open demo').count()==2)
        check('Entrance is English',not CJK.search(page.locator('body').inner_text()))
        check('Entrance images loaded',page.locator('img').evaluate_all('(xs)=>xs.every(x=>x.complete&&x.naturalWidth>0)'))
        page.screenshot(path=str(artifacts/'collection-desktop.png'),full_page=True)
        page.set_viewport_size({'width':390,'height':844})
        check('Collection mobile entrance has no horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        page.screenshot(path=str(artifacts/'collection-mobile.png'),full_page=True)
        page.set_viewport_size({'width':1920,'height':1080})
        for name in NAMES:
            project=ROOT/'projects'/name;config=read_json(project/'project.json');api='__PT' if name=='proxitouch' else '__LAB'
            response=page.goto(base+name+'/',wait_until='load');check(name+' real project route',response.status==200)
            page.wait_for_function(f'window.{api}?.ready',timeout=60000)
            ev(page,api,'API.captureMode(true);API.stop();')
            ids=ev(page,api,'API.scenes.map(s=>s.id)')
            check(name+' scene count',len(ids)==config['sceneCount'])
            report['projects'][name]={'runtimeSha256':sha(project/'index.html'),'scenes':len(ids),'renderer':ev(page,api,'API.diagnostics().renderer')}
            for sid in ids:
                for phase in (0,.5,1):
                    if name=='proxitouch':ev(page,api,'a=>{API.ambientTime(6.8);API.goTo(a[0],a[1]);API.flush();}',[sid,phase])
                    else:ev(page,api,'a=>{API.goTo(a[0],a[1]);API.flush();}',[sid,phase])
                    d=ev(page,api,'API.diagnostics()')
                    check(f'{name} {sid} phase {phase}: renders without GL, math or runtime errors',d.get('glError')==0 and d.get('mathErrors')==0 and not d.get('errors'),{'glError':d.get('glError'),'mathErrors':d.get('mathErrors'),'errors':d.get('errors')})
                    check(f'{name} {sid} phase {phase}: finite camera and model',ev(page,api,"()=>{const s=API.snapshot();return Object.values(s.camera).every(v=>typeof v!=='number'||Number.isFinite(v))&&s.camera.position.every(Number.isFinite);}"))
                    check(f'{name} {sid} phase {phase}: no panel leaves the viewport',not d.get('overflow'),d.get('overflow'))
                text=page.locator('#app').inner_text()
                check(f'{name} {sid}: visible text is English',not CJK.search(text))
            check(name+' no private homepage block',page.locator('.author-info').count()==0)
            if name=='proxitouch':
                ev(page,api,"API.captureMode(false);API.goTo('S12',0);")
                hint=page.locator('.navigation-hint').inner_text()
                check('Proxi live loop navigation hint is accurate','skips the animation' in hint,hint)
                page.locator('#next-button').click();check('Proxi button immediately interrupts loop',ev(page,api,'API.snapshot().scene')=='S13')
                ev(page,api,"API.goTo('S00',0);");page.wait_for_timeout(2500)
                check('Proxi cover stage track follows the loop',page.locator('.stage-track li.active').count()==1 and page.locator('.stage-track').is_visible())
                ev(page,api,"API.captureMode(true);API.goTo('S19',.85);API.flush();")
                check('Proxi S19 highlights the pressure paragraph',page.locator('.stage-copy.active').get_attribute('data-stage')=='pressure')
                ev(page,api,"API.goTo('S14',1);")
                before=ev(page,api,'API.snapshot().scene');page.locator('#menu-button').press('Space')
                check('Proxi focused menu Space opens menu without changing scene',page.locator('.chapter-menu').is_visible() and ev(page,api,'API.snapshot().scene')==before)
                page.keyboard.press('Escape');page.locator('#notes-button').press('Space')
                check('Proxi focused notes Space toggles notes without changing scene',not ev(page,api,'API.snapshot().notes') and ev(page,api,'API.snapshot().scene')==before)
                page.locator('#notes-button').click()
                before=ev(page,api,'API.snapshot()');page.locator('#explore-button').click();page.locator('#depth-input').press('End');page.keyboard.press('Escape')
                after=ev(page,api,'API.snapshot()');check('Proxi explore exit restores capture model/camera',before['camera']==after['camera'] and before['model']==after['model'])
                page.screenshot(path=str(artifacts/'proxitouch.png'))
            else:
                ev(page,api,"API.captureMode(false);API.goTo('04',0,true);")
                page.wait_for_function('__LAB.snapshot().state.field==="potential"',timeout=30000)
                check('Lab field page loop advances the field view',True)
                page.locator('[data-field="strength"]').click();check('Lab field switch selects strength',ev(page,api,'API.snapshot().state.field')=='strength')
                page.locator('#next').click();check('Lab Next interrupts the loop',ev(page,api,'API.snapshot().scene')=='05')
                check('Lab field switch only appears where it is used',not page.locator('.field-control').is_visible())
                ev(page,api,"API.captureMode(true);API.goTo('05',1);API.captureMode(false);API.stop();")
                page.locator('#menu-toggle').press('Space');check('Lab focused menu Space leaves phase and scene unchanged',page.locator('.menu').is_visible() and ev(page,api,'API.snapshot().scene')=='05')
                page.keyboard.press('Escape')
                page.locator('#theta').evaluate("x=>{x.value='120';x.dispatchEvent(new Event('input',{bubbles:true}))}")
                snap=ev(page,api,'API.snapshot()');check('Lab angle slider sets the angle and stops the loop',abs(snap['state']['theta']-120)<1e-6 and not snap['playing'])
                marker=page.locator('.chart .marker').first.get_attribute('cy');check('Lab chart marker stays in the chart',0<float(marker)<page.locator('.chart svg').bounding_box()['height'])
                ev(page,api,"API.goTo('01',.5);API.stop();");box=page.locator('#model-zone').bounding_box()
                page.mouse.move(box['x']+box['width']/2,box['y']+box['height']/2);page.mouse.down();page.mouse.move(box['x']+box['width']/2+90,box['y']+box['height']/2-20,steps=6);page.mouse.up()
                check('Lab model turns by direct drag and offers Reset view',page.locator('#reset-view').is_visible())
                page.locator('#reset-view').click();check('Lab Reset view hides again',not page.locator('#reset-view').is_visible())
                ev(page,api,"API.captureMode(true);API.goTo('05',.45);API.flush();")
                page.screenshot(path=str(artifacts/'mutual-capacitance.png'))
            page.set_viewport_size({'width':1280,'height':720})
            d=ev(page,api,'API.diagnostics()');check(name+' desktop document fits viewport',not d.get('documentOverflow'),d.get('overflow'))
            page.set_viewport_size({'width':1920,'height':1080})
            response=page.goto(base+name+'/previews/',wait_until='networkidle')
            image_sources=page.locator('img').evaluate_all('(xs)=>xs.map(x=>x.src)')
            check(name+' project-path gallery and all image URLs load',response.status==200 and image_sources and all(page.request.get(src).status==200 for src in image_sources))
            context=browser.new_context(offline=True,viewport={'width':1280,'height':720});offline=context.new_page();attach(offline)
            offline.goto((project/'index.html').as_uri(),wait_until='load',timeout=90000)
            offline.wait_for_function(f'window.{api}?.ready',timeout=60000)
            check(name+' standalone file opens with network disabled',ev(offline,api,'API.diagnostics().glError')==0)
            context.close()
            print('BROWSER VERIFIED',name,len(ids),'scenes at 3 phases, real navigation and file://',flush=True)
        check('No browser runtime exceptions',not report['errors'],report['errors'])
        check('No external runtime requests',not report['externalRequests'],report['externalRequests'])
    except Exception as error:
        page.screenshot(path=str(artifacts/'failure.png'),full_page=True)
        check('Browser verification completed',False,repr(error));raise
    finally:
        browser.close();write_json(ROOT/'qa/browser-qa.json',report)
failures=[c for c in report['checks'] if not c['passed']]
print('BROWSER QA',len(report['checks']),'checks;',len(failures),'failures',flush=True)
sys.exit(bool(failures))
