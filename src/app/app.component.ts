import { Component, OnInit } from '@angular/core';
import 'jquery';
import { Title } from '@angular/platform-browser';
import { AuthoringService } from './services/authoring/authoring.service';
import { BranchingService } from './services/branching/branching.service';
import { EnvService } from './services/environment/env.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    versions: object;
    environment: string;
    toastrConfig = {
        closeButton: true,
        disableTimeOut: true
    };

    constructor(private authoringService: AuthoringService,
                private branchingService: BranchingService,
                private envService: EnvService,
                private toastr: ToastrService,
                private titleService: Title) {

    }

    ngOnInit() {
        this.titleService.setTitle('SNOMED CT Angular Template');
        this.environment = this.envService.env;

        this.authoringService.getVersions().subscribe(versions => {
            this.versions = versions;
        });

        this.authoringService.getUIConfiguration().subscribe(config => {
            this.authoringService.uiConfiguration = config;
        });

        this.branchingService.setBranchPath('MAIN');
        this.assignFavicon();

    }

    toastrSuccess() {
        this.toastr.success('Message data goes here', 'SUCCESS', this.toastrConfig);
    }

    toastrWarning() {
        this.toastr.warning('Message data goes here', 'WARNING', this.toastrConfig);
    }

    toastrError() {
        this.toastr.error('Message data goes here', 'ERROR', this.toastrConfig);
    }

    toastrInfo() {
        this.toastr.info('Message data goes here', 'INFO', this.toastrConfig);
    }

    toastrShow() {
        this.toastr.show('Message data goes here', 'SHOW', this.toastrConfig);
    }

    assignFavicon() {
        const favicon = $('#favicon');

        switch (this.environment) {
            case 'local':
                favicon.attr('href', 'favicon_grey.ico');
                break;
            case 'dev':
                favicon.attr('href', 'favicon_red.ico');
                break;
            case 'uat':
                favicon.attr('href', 'favicon_green.ico');
                break;
            case 'training':
                favicon.attr('href', 'favicon_yellow.ico');
                break;
            default:
                favicon.attr('href', 'favicon.ico');
                break;
        }
    }
}
