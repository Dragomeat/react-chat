<?php declare(strict_types=1);

use App\Models\Conversation\ConversationType;
use App\Models\Conversation\NameType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateConversationsTable
 */
class CreateConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable();
            $table->enum('name_type', NameType::getAll())->default(NameType::AUTO_GENERATED);
            $table->enum('type', ConversationType::getAll())->default(ConversationType::PRIVATE_DUAL);
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conversations');
    }
}
