
      Run the migrations.
    
    public function up(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            // Agregamos la columna de imagen
            $table->string('imagen')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            // Si la migración se revierte, eliminamos la columna
            $table->dropColumn('imagen');
        });
    }
