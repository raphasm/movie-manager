import {
  FilmSlateIcon,
  CalendarBlankIcon,
  TagIcon,
  UploadSimpleIcon,
  XIcon,
} from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { Input } from '../components/Input'
import { TextArea } from '../components/TextArea'
import { Button } from '../components/Button'
import { Link } from '../components/Link'
import { Select } from '../components/Select'
import { useMutation } from '@tanstack/react-query'
import { createMovies } from '../api/create-movies'
import { categoriesSchema, CATEGORIES_OPTIONS } from '../interface/categories'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Spinner } from '../components/Spinner'
import { useFileUpload } from '../hooks/useFileUpload'

const createMovieSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  year: z.string().min(4, 'Ano inválido').max(4, 'Ano inválido'),
  category: categoriesSchema,
  description: z.string().min(1, 'Descrição é obrigatória'),
})

type CreateMovieForm = z.infer<typeof createMovieSchema>

const dashboardStyles = tv({
  slots: {
    container: 'max-w-[1070px] mx-auto px-4 pt-16',
    content: 'flex items-start gap-12',
    // Image Upload Area
    imageUploadWrapper: 'relative w-[381px] h-[490px] flex-shrink-0',
    imageUpload:
      'flex flex-col items-center justify-center w-full h-full bg-custom-bg-menu rounded-[18px] cursor-pointer border border-transparent hover:border-custom-purple transition-colors overflow-hidden',
    imageUploadActive: 'border-custom-purple border-2',
    imageUploadError: 'border-red-500 border-2',
    uploadIcon: 'text-custom-purple mb-3',
    uploadText: 'text-base text-custom-text-gray font-body',
    uploadedImage: 'w-full h-full object-cover',
    removeImageButton:
      'absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full cursor-pointer transition-colors z-10',
    // Details Section
    detailsSection: 'flex-1 flex flex-col gap-16',
    form: 'flex flex-col gap-6',
    formTitle:
      'text-xl leading-[1.276] font-title font-bold text-custom-text-light',
    fieldsGrid: 'flex flex-wrap items-start gap-4',
    fieldFull: 'w-full',
    fieldHalf: 'flex-1 min-w-[200px]',
    actions: 'flex items-center justify-end gap-8',
    errorText:
      'text-sm leading-[1.6] font-body text-custom-error mt-1.5 flex justify-center',
  },
})

export function Dashboard() {
  const styles = dashboardStyles()
  const navigate = useNavigate()

  // Hook de upload de arquivo
  const upload = useFileUpload({ maxSize: 5 * 1024 * 1024 })

  const form = useForm<CreateMovieForm>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      title: '',
      year: '',
      description: '',
    },
  })

  // Mutation para criar filme
  const { mutateAsync: createMovieMutation, isPending } = useMutation({
    mutationFn: createMovies,
    onSuccess: () => {
      toast.success('Filme criado com sucesso!')
      navigate('/home')
    },
    onError: () => {
      toast.error('Erro ao criar filme. Tente novamente.')
    },
  })

  // Submit do formulário
  async function handleSubmit(data: CreateMovieForm) {
    if (!upload.file) {
      return
    }

    await createMovieMutation({
      title: data.title,
      year: data.year,
      category: data.category,
      description: data.description,
      file: upload.file,
    })
  }

  return (
    <div className={styles.container()}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className={styles.content()}>
          {/* Image Upload Area */}
          <div className={styles.imageUploadWrapper()}>
            {/* Botão de remover imagem */}
            {upload.previewUrl && (
              <button
                type="button"
                className={styles.removeImageButton()}
                onClick={upload.clear}
                title="Remover imagem"
              >
                <XIcon size={16} weight="bold" className="text-white" />
              </button>
            )}

            <div
              className={`${styles.imageUpload()} ${
                upload.isDragging ? styles.imageUploadActive() : ''
              } ${upload.error ? styles.imageUploadError() : ''}`}
              onClick={upload.handleClick}
              onDragOver={upload.handleDragOver}
              onDragLeave={upload.handleDragLeave}
              onDrop={upload.handleDrop}
            >
              {/* Input hidden */}
              <input
                ref={upload.inputRef}
                type="file"
                accept="image/*"
                onChange={upload.handleInputChange}
                className="hidden"
              />

              {/* Preview ou placeholder */}
              {upload.previewUrl ? (
                <img
                  src={upload.previewUrl}
                  alt="Preview"
                  className={styles.uploadedImage()}
                />
              ) : (
                <>
                  <UploadSimpleIcon
                    size={40}
                    weight="regular"
                    className={styles.uploadIcon()}
                  />
                  <span className={styles.uploadText()}>Fazer upload</span>
                </>
              )}
            </div>

            {/* Erro de arquivo */}
            {upload.error && (
              <p className={styles.errorText()}>{upload.error}</p>
            )}
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection()}>
            {/* Form */}
            <div className={styles.form()}>
              <h1 className={styles.formTitle()}>Novo filme</h1>

              <div className={styles.fieldsGrid()}>
                {/* Título - Full width */}
                <div className={styles.fieldFull()}>
                  <Input
                    icon={<FilmSlateIcon size={20} weight="regular" />}
                    placeholder="Título"
                    {...form.register('title')}
                    error={!!form.formState.errors.title}
                    errorMessage={form.formState.errors.title?.message}
                  />
                </div>

                {/* Ano */}
                <div className={styles.fieldHalf()}>
                  <Input
                    icon={<CalendarBlankIcon size={20} weight="regular" />}
                    placeholder="Ano"
                    {...form.register('year')}
                    error={!!form.formState.errors.year}
                    errorMessage={form.formState.errors.year?.message}
                  />
                </div>

                {/* Categoria - Half width */}
                <div className={styles.fieldHalf()}>
                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        placeholder="Categoria"
                        icon={<TagIcon size={20} weight="regular" />}
                        value={field.value}
                        onValueChange={field.onChange}
                        options={CATEGORIES_OPTIONS}
                        error={!!form.formState.errors.category}
                        errorMessage={form.formState.errors.category?.message}
                      />
                    )}
                  />
                </div>

                {/* Descrição - Full width */}
                <div className={styles.fieldFull()}>
                  <TextArea
                    placeholder="Descrição"
                    rows={5}
                    {...form.register('description')}
                    error={!!form.formState.errors.description}
                    errorMessage={form.formState.errors.description?.message}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions()}>
              <Link href="/home">Cancelar</Link>
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth={false}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Spinner size="1" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
