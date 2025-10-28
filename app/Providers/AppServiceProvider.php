<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureModels();
        $this->configureDates();
    }

    public function configureModels(): void
    {
        Model::unguard();
        Model::shouldBeStrict(! app()->isProduction());
    }

    public function configureDates(): void
    {
        Date::use(CarbonImmutable::class);
    }
}
