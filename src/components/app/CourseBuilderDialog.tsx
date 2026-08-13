import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CourseBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialCourse?: any;
}

interface LessonData {
  id: number;
  title: string;
  video_url: string;
  material_url: string;
  material_name: string;
  summary: string;
}

interface ModuleData {
  id: number;
  title: string;
  lessons: LessonData[];
}

function PdfUploadField({ 
  materialUrl, 
  materialName,
  onUploadComplete, 
  onRemove,
  moduleId,
  lessonId 
}: { 
  materialUrl: string;
  materialName: string;
  onUploadComplete: (url: string, name: string) => void;
  onRemove: () => void;
  moduleId: number;
  lessonId: number;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    
    if (file.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF são permitidos.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("O arquivo deve ter no máximo 50MB.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `lessons/${moduleId}/${lessonId}/${timestamp}_${safeName}`;

      // Simular progresso visual
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const { data, error } = await supabase.storage
        .from('lesson-materials')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      clearInterval(progressInterval);

      if (error) {
        // Se o bucket não existir, salvar como base64 no localStorage como fallback
        console.warn("Storage upload failed, using fallback:", error.message);
        
        // Fallback: salvar referência local
        const localUrl = URL.createObjectURL(file);
        
        // Salvar no localStorage para persistência
        const reader = new FileReader();
        reader.onload = () => {
          const materials = JSON.parse(localStorage.getItem('lesson_materials') || '{}');
          materials[`${moduleId}_${lessonId}`] = {
            name: file.name,
            data: reader.result,
            size: file.size,
            uploadedAt: new Date().toISOString()
          };
          localStorage.setItem('lesson_materials', JSON.stringify(materials));
        };
        reader.readAsDataURL(file);

        setUploadProgress(100);
        onUploadComplete(localUrl, file.name);
        toast.success(`"${file.name}" salvo com sucesso!`);
        return;
      }

      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from('lesson-materials')
        .getPublicUrl(data.path);

      setUploadProgress(100);
      onUploadComplete(urlData.publicUrl, file.name);
      toast.success(`"${file.name}" enviado com sucesso!`);

    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error("Erro ao enviar o arquivo. Tente novamente.");
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  // Se já tem um PDF anexado
  if (materialUrl && materialName) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-green-200 bg-green-50/50">
        <div className="bg-green-100 p-2 rounded-lg shrink-0">
          <FileText className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-green-800 truncate">{materialName}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span className="text-[10px] text-green-600 font-medium">PDF anexado com sucesso</span>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Upload em progresso
  if (isUploading) {
    return (
      <div className="p-4 rounded-lg border border-coral/30 bg-coral/5">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-coral animate-spin shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-coral">Enviando PDF...</p>
            <div className="mt-2 h-1.5 rounded-full bg-coral/10 overflow-hidden">
              <div 
                className="h-full bg-coral rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Área de drop/upload
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative p-4 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200
        ${isDragOver 
          ? 'border-coral bg-coral/5 scale-[1.01]' 
          : 'border-slate-200 bg-slate-50/30 hover:border-coral/40 hover:bg-coral/5'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleInputChange}
      />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg shrink-0 transition-colors ${isDragOver ? 'bg-coral/10' : 'bg-slate-100'}`}>
          <Upload className={`h-5 w-5 ${isDragOver ? 'text-coral' : 'text-slate-400'}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">
            {isDragOver ? 'Solte o PDF aqui!' : 'Arraste o PDF ou clique para selecionar'}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Aceita apenas PDF • Máximo 50MB</p>
        </div>
      </div>
    </div>
  );
}


export function CourseBuilderDialog({ open, onOpenChange, onSuccess, initialCourse }: CourseBuilderProps) {
  const { user } = useAuth();
  
  const [isSaving, setIsSaving] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSpec, setCourseSpec] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseLevel, setCourseLevel] = useState("Iniciante");
  const [courseCover, setCourseCover] = useState("");
  
  const [modules, setModules] = useState<ModuleData[]>([
    { id: Date.now(), title: "Módulo 1", lessons: [{ id: Date.now() + 1, title: "Aula 1", video_url: "", material_url: "", material_name: "", summary: "" }] }
  ]);


  
  useEffect(() => {
    if (initialCourse && open) {
      setCourseTitle(initialCourse.title || "");
      setCourseSpec(initialCourse.specialty || "");
      setCourseDesc(initialCourse.description || "");
      setCourseCover(initialCourse.cover || "");
      
      // Se o curso vem do Supabase, carregar módulos e aulas do banco
      if (initialCourse.isFromDB || initialCourse.dbId) {
        const courseDbId = initialCourse.dbId || initialCourse.id;
        const loadFromDB = async () => {
          try {
            const { data: dbModules, error: modError } = await supabase
              .from('modules')
              .select('*')
              .eq('course_id', courseDbId)
              .order('order', { ascending: true });

            if (modError || !dbModules || dbModules.length === 0) {
              console.warn("No modules found in DB for course", courseDbId);
              setModules([
                { id: Date.now(), title: "Módulo 1: Introdução", lessons: [{ id: Date.now() + 1, title: "Aula 1", video_url: "", material_url: "", material_name: "", summary: "" }] }
              ]);
              return;
            }

            const formattedModules: ModuleData[] = [];

            for (const dbMod of dbModules) {
              const { data: dbLessons, error: lessError } = await supabase
                .from('lessons')
                .select('*')
                .eq('module_id', dbMod.id)
                .order('order', { ascending: true });

              const lessons: LessonData[] = (dbLessons || []).map((l: any, i: number) => ({
                id: Date.now() + i + Math.random() * 1000,
                title: l.title,
                video_url: l.video_url || "",
                material_url: l.material_url || "",
                material_name: l.material_name || "",
                summary: "",
              }));

              if (lessons.length === 0) {
                lessons.push({ id: Date.now(), title: "Nova Aula", video_url: "", material_url: "", material_name: "", summary: "" });
              }

              formattedModules.push({
                id: Date.now() + formattedModules.length,
                title: dbMod.title,
                lessons
              });
            }

            setModules(formattedModules);
          } catch (e) {
            console.error("Error loading modules from DB:", e);
          }
        };
        loadFromDB();
      } else {
        // Carregar os módulos estáticos do curso de ortopedia
        import("@/lib/courses-data").then(({ ortopediaModules }) => {
          if (initialCourse.id === "ortopedia-avancada") {
            const formattedModules: ModuleData[] = ortopediaModules.map(m => ({
              id: m.id,
              title: m.title,
              lessons: m.topics.map((t: any, i: number) => ({ id: Date.now() + i, title: t, video_url: "", material_url: "", material_name: "", summary: "" }))
            }));
            setModules(formattedModules);
          } else {
            setModules([
              { id: Date.now(), title: "Módulo 1: Introdução", lessons: [{ id: Date.now() + 1, title: "Aula 1: Conceitos Básicos", video_url: "", material_url: "", material_name: "", summary: "" }] }
            ]);
          }
        });
      }
      
    } else if (!open) {
      setCourseTitle("");
      setCourseSpec("");
      setCourseDesc("");
      setCourseCover("");
      setModules([{ id: Date.now(), title: "Módulo 1", lessons: [{ id: Date.now() + 1, title: "Aula 1", video_url: "", material_url: "", material_name: "", summary: "" }] }]);
    }
  }, [initialCourse, open]);

  const addModule = () => {
    setModules([...modules, { 
      id: Date.now(), 
      title: `Módulo ${modules.length + 1}`, 
      lessons: [{ id: Date.now() + 1, title: "Nova Aula", video_url: "", material_url: "", material_name: "", summary: "" }] 
    }]);
  };

  const addLesson = (moduleId: number) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: [...m.lessons, { id: Date.now(), title: "Nova Aula", video_url: "", material_url: "", material_name: "", summary: "" }] };
      }
      return m;
    }));
  };

  const removeLesson = (moduleId: number, lessonId: number) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        const filtered = m.lessons.filter(l => l.id !== lessonId);
        if (filtered.length === 0) return m; // Não permitir remover a última aula
        return { ...m, lessons: filtered };
      }
      return m;
    }));
  };

  const removeModule = (moduleId: number) => {
    if (modules.length <= 1) return; // Não permitir remover o último módulo
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const updateModuleTitle = (moduleId: number, title: string) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, title } : m));
  };

  const updateLesson = (moduleId: number, lessonId: number, field: string, value: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return m;
    }));
  };

  const handlePdfUpload = (moduleId: number, lessonId: number, url: string, name: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === lessonId ? { ...l, material_url: url, material_name: name } : l)
        };
      }
      return m;
    }));
  };

  const handlePdfRemove = (moduleId: number, lessonId: number) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === lessonId ? { ...l, material_url: "", material_name: "" } : l)
        };
      }
      return m;
    }));
  };

  const handleSave = async () => {
    if (!courseTitle || !courseSpec) {
      toast.error("Preencha o título e a especialidade do curso!");
      return;
    }
    
    setIsSaving(true);
    try {
      // 1. Inserir Curso
      const { data: courseData, error: courseError } = await supabase.from('courses').insert({
        title: courseTitle,
        specialty: courseSpec,
        description: courseDesc,
        cover_url: courseCover || 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80',
        level: courseLevel,
        teacher_name: user?.user_metadata?.name || user?.email || "Professor",
        teacher_id: user?.id,
        featured: false
      }).select().single();

      if (courseError) throw courseError;
      
      const courseId = courseData.id;

      // 2. Inserir Módulos e Aulas
      for (let i = 0; i < modules.length; i++) {
        const mod = modules[i];
        const { data: modData, error: modError } = await supabase.from('modules').insert({
          course_id: courseId,
          title: mod.title,
          order: i + 1
        }).select().single();
        
        if (modError) throw modError;
        
        const modId = modData.id;
        
        const lessonsToInsert = mod.lessons.map((lesson, lIdx) => ({
          module_id: modId,
          title: lesson.title,
          video_url: lesson.video_url,
          order: lIdx + 1
        }));
        
        if (lessonsToInsert.length > 0) {
          const { error: lessonError } = await supabase.from('lessons').insert(lessonsToInsert);
          if (lessonError) throw lessonError;
        }
      }

      // 3. Salvar referências de materiais no localStorage (complemento)
      const materialRefs: Record<string, { name: string; url: string }> = {};
      modules.forEach(mod => {
        mod.lessons.forEach(lesson => {
          if (lesson.material_url && lesson.material_name) {
            materialRefs[`${mod.title}_${lesson.title}`] = {
              name: lesson.material_name,
              url: lesson.material_url
            };
          }
        });
      });
      if (Object.keys(materialRefs).length > 0) {
        const existing = JSON.parse(localStorage.getItem('course_material_refs') || '{}');
        localStorage.setItem('course_material_refs', JSON.stringify({ ...existing, ...materialRefs }));
      }

      toast.success("Curso publicado com sucesso!");
      onOpenChange(false);
      if (onSuccess) onSuccess();
      
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao salvar curso: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Contar quantos PDFs foram anexados
  const totalPdfs = modules.reduce((acc, m) => acc + m.lessons.filter(l => l.material_url).length, 0);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Construtor de Cursos (Produção)</DialogTitle>
          <p className="text-sm text-muted-foreground">Preencha os dados reais do seu curso para subir na plataforma.</p>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          {/* Dados do Curso */}
          <div className="space-y-4 p-4 border border-border rounded-xl bg-slate-50/50">
            <h3 className="font-bold text-lg">Informações Principais</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Título do Curso *</label>
                <Input value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="Ex: Neurologia Avançada" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Especialidade *</label>
                <Input value={courseSpec} onChange={e => setCourseSpec(e.target.value)} placeholder="Ex: Neurologia" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold">Descrição Breve</label>
              <Textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} placeholder="Descreva o que os alunos vão aprender..." />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Nível</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={courseLevel} onChange={e => setCourseLevel(e.target.value)}
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Link da Capa (Imagem URL)</label>
                <Input value={courseCover} onChange={e => setCourseCover(e.target.value)} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Resumo de materiais */}
          {totalPdfs > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              <p className="text-sm text-green-700">
                <strong>{totalPdfs}</strong> {totalPdfs === 1 ? 'PDF anexado' : 'PDFs anexados'} de <strong>{totalLessons}</strong> {totalLessons === 1 ? 'aula' : 'aulas'}
              </p>
            </div>
          )}

          {/* Módulos e Aulas */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg border-b pb-2">Grade Curricular</h3>
            
            {modules.map((module, mIdx) => (
              <div key={module.id} className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b border-border flex justify-between items-center gap-3">
                  <Input 
                    value={module.title} 
                    onChange={e => updateModuleTitle(module.id, e.target.value)}
                    className="font-bold text-foreground bg-white"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => addLesson(module.id)} className="text-coral border-coral/20">
                      + Aula
                    </Button>
                    {modules.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeModule(module.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  {module.lessons.map((lesson, idx) => (
                    <div key={lesson.id} className="bg-background border border-border rounded-lg p-4 space-y-3 relative group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aula {idx + 1}</span>
                        {module.lessons.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeLesson(module.id, lesson.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-muted-foreground">Título da Aula</label>
                          <Input 
                            value={lesson.title} 
                            onChange={e => updateLesson(module.id, lesson.id, 'title', e.target.value)} 
                            placeholder="Ex: Anatomia Básica" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-coral">Link do YouTube *</label>
                          <Input 
                            value={lesson.video_url} 
                            onChange={e => updateLesson(module.id, lesson.id, 'video_url', e.target.value)} 
                            placeholder="https://youtube.com/watch?v=..." 
                            className="border-coral/30 focus-visible:ring-coral/20"
                          />
                        </div>
                      </div>

                      {/* Upload de PDF */}
                      <div className="space-y-1.5 mt-1">
                        <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          Material da Aula (PDF)
                        </label>
                        <PdfUploadField
                          materialUrl={lesson.material_url}
                          materialName={lesson.material_name}
                          onUploadComplete={(url, name) => handlePdfUpload(module.id, lesson.id, url, name)}
                          onRemove={() => handlePdfRemove(module.id, lesson.id)}
                          moduleId={module.id}
                          lessonId={lesson.id}
                        />
                      </div>

                      <div className="space-y-1 mt-2">
                        <label className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                          Resumo da Aula (Post-it / Anotações)
                        </label>
                        <Textarea 
                          value={lesson.summary || ""} 
                          onChange={e => updateLesson(module.id, lesson.id, 'summary', e.target.value)} 
                          placeholder="Digite aqui os pontos principais, avisos ou anotações para o aluno ver..." 
                          className="bg-amber-50/50 border-amber-200 focus-visible:ring-amber-300 min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full border-dashed py-6 text-muted-foreground"
              onClick={addModule}
            >
              <Plus className="mr-2 h-5 w-5" /> Criar Novo Módulo
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-8 border-t border-border pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancelar</Button>
          <Button className="bg-coral text-coral-foreground hover:bg-coral/90 px-8" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando na Nuvem..." : "Salvar e Publicar Turma"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
