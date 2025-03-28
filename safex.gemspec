# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "safex"
  spec.version       = "0.1.0"
  spec.authors       = ["morphy"]
  spec.email         = ["36381325+morphy@users.noreply.github.com"]

  spec.summary       = "TODO: Write a short summary, because Rubygems requires one."
  spec.homepage      = "TODO: Put your gem's website or public repo URL here."
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_data|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
  spec.add_runtime_dependency "jekyll_picture_tag", "~> 2.0"
  spec.add_runtime_dependency "jekyll-last-modified-at", "~> 1.3"
  spec.add_runtime_dependency "jekyll-minifier", "~> 0.1"
end
