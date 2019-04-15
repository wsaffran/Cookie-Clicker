class PlayersController < ApplicationController
  def index
    @players = Player.all
    render json: @players
  end

  def show
    @player = Player.find(params[:id])
    render json:@player
  end

  def create
    @player = Player.find_or_create_by(name: params[:name], highscore: params[:highscore])
    render json: @player
  end
end
